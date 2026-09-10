import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "aquareseve_session";
const PUBLIC_PATHS = ["/login", "/unauthorized"];

function isValidSession(token: string | undefined) {
  if (!token || !process.env.AUTH_SECRET) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [userIdText, expiresText, signature] = parts;
  const payload = `${userIdText}.${expiresText}`;
  const expected = createHmac("sha256", process.env.AUTH_SECRET)
    .update(payload)
    .digest("base64url");

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const userId = Number(userIdText);
  const expiresAt = Number(expiresText);
  return Number.isInteger(userId) && Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".") ||
    PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (isValidSession(token)) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!api).*)"],
};
