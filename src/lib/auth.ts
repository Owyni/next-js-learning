import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { sql } from "@/src/db";

const COOKIE_NAME = "aquareseve_session";
const SESSION_DAYS = 7;

type SessionPayload = {
  userId: number;
  expiresAt: number;
};

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET no está definida");
  return secret;
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, storedHash] = stored.split(":");
  if (!salt || !storedHash) return false;

  const hash = scryptSync(password, salt, 64);
  const expected = Buffer.from(storedHash, "hex");
  return expected.length === hash.length && timingSafeEqual(hash, expected);
}

function sign(payload: string) {
  return createHmac("sha256", getAuthSecret()).update(payload).digest("base64url");
}

function createSessionToken(userId: number) {
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${userId}.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

function readSessionToken(token: string): SessionPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [userIdText, expiresText, signature] = parts;
  const payload = `${userIdText}.${expiresText}`;
  const expected = sign(payload);

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const userId = Number(userIdText);
  const expiresAt = Number(expiresText);
  if (!Number.isInteger(userId) || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) return null;

  return { userId, expiresAt };
}

export async function setSession(userId: number) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionToken(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", { httpOnly: true, expires: new Date(0), path: "/" });
}

export async function getCurrentUser() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;

  let session: SessionPayload | null;
  try {
    session = readSessionToken(token);
  } catch {
    return null;
  }
  if (!session) return null;

  const rows = await sql`
    SELECT id, name, email
    FROM users
    WHERE id = ${session.userId}
    LIMIT 1
  `;

  return (rows[0] as { id: number; name: string; email: string } | undefined) ?? null;
}
