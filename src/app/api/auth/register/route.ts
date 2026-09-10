import { NextResponse } from "next/server";
import { sql } from "@/src/db";
import { hashPassword, setSession } from "@/src/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const cleanName = String(name ?? "").trim();
    const cleanEmail = String(email ?? "").trim().toLowerCase();
    const cleanPassword = String(password ?? "");

    if (!cleanName || !cleanEmail || !cleanPassword) {
      return NextResponse.json({ error: "Completa todos los campos." }, { status: 400 });
    }
    if (cleanName.length > 100 || cleanEmail.length > 200) {
      return NextResponse.json({ error: "Los datos son demasiado largos." }, { status: 400 });
    }
    if (cleanPassword.length < 8) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 8 caracteres." }, { status: 400 });
    }

    const existing = await sql`SELECT id FROM users WHERE email = ${cleanEmail} LIMIT 1`;
    if (existing.length) {
      return NextResponse.json({ error: "Ya existe una cuenta con ese correo." }, { status: 409 });
    }

    const passwordHash = hashPassword(cleanPassword);
    const rows = await sql`
      INSERT INTO users (name, email, password_hash)
      VALUES (${cleanName}, ${cleanEmail}, ${passwordHash})
      RETURNING id, name, email
    `;

    if (!rows[0]) {
      return NextResponse.json({ error: "No se pudo crear la cuenta." }, { status: 500 });
    }

    await setSession(Number(rows[0].id));
    return NextResponse.json({ user: rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    const message = error instanceof Error ? error.message : "";
    if (message.includes("password_hash") || message.includes("column")) {
      return NextResponse.json(
        { error: "La base de datos aún no tiene habilitado el registro. Ejecuta la migración 0001_auth.sql en Neon." },
        { status: 500 }
      );
    }
    if (message.includes("AUTH_SECRET")) {
      return NextResponse.json(
        { error: "Falta configurar AUTH_SECRET en las variables de entorno de Vercel." },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: "No se pudo crear la cuenta." }, { status: 500 });
  }
}
