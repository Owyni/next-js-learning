import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white/90 p-8 text-center shadow-xl shadow-cyan-900/5">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 text-2xl font-bold">
          A
        </div>
        <h1 className="text-2xl font-bold text-gray-950">Necesitas iniciar sesión</h1>
        <p className="mt-2 text-gray-500">
          Para acceder a AquaReserve debes tener una cuenta e iniciar sesión.
        </p>
        <div className="mt-7 flex flex-col gap-3">
          <Link
            href="/login"
            className="rounded-xl bg-gray-900 hover:bg-gray-800 px-5 py-3 font-semibold text-white transition"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/login?mode=register"
            className="rounded-xl border border-gray-300 bg-white hover:border-gray-500 px-5 py-3 font-semibold text-gray-800 transition"
          >
            Crear una cuenta
          </Link>
        </div>
      </div>
    </main>
  );
}
