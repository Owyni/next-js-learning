"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isRegister = mode === "register";

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Algo salió mal.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex justify-center items-center gap-2 text-cyan-600 mb-8">
          <span className="text-2xl font-bold">AquaReserve</span>
        </Link>

        <div className="rounded-3xl border border-gray-200 bg-white/90 p-7 sm:p-8 shadow-xl shadow-cyan-900/5 backdrop-blur">
          <h1 className="text-2xl font-bold text-gray-900">
            {isRegister ? "Crea tu cuenta" : "Bienvenido de nuevo"}
          </h1>
          <p className="text-gray-500 mt-2 mb-7">
            {isRegister ? "Guarda tus datos y empieza a reservar." : "Inicia sesión para continuar."}
          </p>

          <form onSubmit={submit} className="space-y-4">
            {isRegister && (
              <input
                required
                placeholder="Nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
                autoComplete="name"
              />
            )}
            <input
              required
              type="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input"
              autoComplete="email"
            />
            <input
              required
              type="password"
              minLength={8}
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input"
              autoComplete={isRegister ? "new-password" : "current-password"}
            />

            {isRegister && <p className="text-xs text-gray-500">Mínimo 8 caracteres.</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              disabled={loading}
              className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-300 text-white font-semibold py-3 transition"
            >
              {loading ? "Procesando..." : isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-gray-100 text-sm">
            <span className="text-gray-500">
              {isRegister ? "¿Ya tienes una cuenta?" : "¿Todavía no tienes cuenta?"}
            </span>{" "}
            <button
              type="button"
              onClick={() => { setMode(isRegister ? "login" : "register"); setError(""); }}
              className="font-semibold text-cyan-600 hover:text-cyan-700"
            >
              {isRegister ? "Inicia sesión" : "Crea una cuenta"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
