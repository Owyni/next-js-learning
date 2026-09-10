"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(searchParams.get("mode") === "register" ? "register" : "login");
  }, [searchParams]);

  const isRegister = mode === "register";

  function changeMode(nextMode: "login" | "register") {
    setMode(nextMode);
    setError("");
    router.replace(nextMode === "register" ? "/login?mode=register" : "/login");
  }

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

      const next = searchParams.get("next");
      router.push(next?.startsWith("/") ? next : "/");
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
          <span className="w-9 h-9 rounded-xl bg-cyan-500 text-white flex items-center justify-center text-lg font-bold shadow-sm">A</span>
          <span className="text-2xl font-bold tracking-tight text-gray-950">AquaReserve</span>
        </Link>
        <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-8 shadow-xl shadow-cyan-900/5 backdrop-blur">
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1 mb-7">
            <button type="button" onClick={() => changeMode("login")} className={`rounded-lg py-2.5 text-sm font-semibold transition ${!isRegister ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>Iniciar sesión</button>
            <button type="button" onClick={() => changeMode("register")} className={`rounded-lg py-2.5 text-sm font-semibold transition ${isRegister ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>Registrarse</button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{isRegister ? "Crea tu cuenta" : "Bienvenido de nuevo"}</h1>
          <p className="text-gray-500 mt-2 mb-7">{isRegister ? "Crea tu cuenta para reservar y publicar espacios." : "Inicia sesión para continuar con AquaReserve."}</p>
          <form onSubmit={submit} className="space-y-4">
            {isRegister && <input required placeholder="Nombre completo" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" autoComplete="name" />}
            <input required type="email" placeholder="Correo electrónico" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" autoComplete="email" />
            <input required type="password" minLength={8} placeholder="Contraseña" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" autoComplete={isRegister ? "new-password" : "current-password"} />
            {isRegister && <p className="text-xs text-gray-500">Tu contraseña debe tener mínimo 8 caracteres.</p>}
            {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-300 text-white font-semibold py-3 transition shadow-sm">{loading ? "Procesando..." : isRegister ? "Crear cuenta" : "Iniciar sesión"}</button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">{isRegister ? "¿Ya tienes una cuenta?" : "¿Todavía no tienes cuenta?"}{" "}<button type="button" onClick={() => changeMode(isRegister ? "login" : "register")} className="font-semibold text-cyan-600 hover:text-cyan-700">{isRegister ? "Inicia sesión" : "Crea una cuenta"}</button></p>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">Tus datos se utilizan únicamente para gestionar tu cuenta.</p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Cargando...</p></main>}>
      <LoginForm />
    </Suspense>
  );
}
