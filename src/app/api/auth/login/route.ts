import { NextResponse } from "next/server";
import { sql } from "@/src/db";
import { setSession, verifyPassword } from "@/src/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const cleanEmail = String(email ?? "").trim().toLowerCase();

    if (!cleanEmail || !password) {
      return NextResponse.json({ error: "Ingresa tu correo y contraseña." }, { status: 400 });
    }

    const rows = await sql`
      SELECT id, name, email, password_hash
      FROM users
      WHERE email = ${cleanEmail}
      LIMIT 1
    `;

    const user = rows[0] as { id: number; name: string; email: string; password_hash: string | null } | undefined;
    if (!user?.password_hash || !verifyPassword(String(password), user.password_hash)) {
      return NextResponse.json({ error: "Correo o contraseña incorrectos." }, { status: 401 });
    }

    await setSession(Number(user.id));
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "No se pudo iniciar sesión." }, { status: 500 });
  }
}
