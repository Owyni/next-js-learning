import { NextResponse } from "next/server";
import { sql } from "@/src/db";
import { hashPassword, setSession } from "@/src/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const cleanName = String(name ?? "").trim();
    const cleanEmail = String(email ?? "").trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      return NextResponse.json({ error: "Completa todos los campos." }, { status: 400 });
    }
    if (cleanName.length > 100 || cleanEmail.length > 200) {
      return NextResponse.json({ error: "Los datos son demasiado largos." }, { status: 400 });
    }
    if (String(password).length < 8) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 8 caracteres." }, { status: 400 });
    }

    const existing = await sql`SELECT id FROM users WHERE email = ${cleanEmail} LIMIT 1`;
    if (existing.length) {
      return NextResponse.json({ error: "Ya existe una cuenta con ese correo." }, { status: 409 });
    }

    const passwordHash = hashPassword(String(password));
    const rows = await sql`
      INSERT INTO users (name, email, password_hash)
      VALUES (${cleanName}, ${cleanEmail}, ${passwordHash})
      RETURNING id, name, email
    `;

    await setSession(Number(rows[0].id));
    return NextResponse.json({ user: rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "No se pudo crear la cuenta." }, { status: 500 });
  }
}
