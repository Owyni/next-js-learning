import Link from "next/link";
import { getCurrentUser } from "@/src/lib/auth";

const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="AquaReserve inicio">
          <div className="w-9 h-9 rounded-xl bg-cyan-500 text-white flex items-center justify-center shadow-sm group-hover:bg-cyan-600 transition-colors">
            <span className="text-lg font-bold">A</span>
          </div>
          <span className="font-bold text-2xl tracking-tight text-gray-950">AquaReserve</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/create-property"
            className="hidden sm:inline-flex rounded-full border border-gray-300 bg-white hover:border-gray-500 hover:shadow-sm text-gray-800 text-sm font-semibold py-2.5 px-5 transition-all"
          >
            Pon tu espacio
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/account"
                className="rounded-full bg-cyan-50 hover:bg-cyan-100 text-cyan-800 text-sm font-semibold py-2.5 px-4 transition"
              >
                Hola, {user.name.split(" ")[0]}
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium py-2.5 px-4 transition"
                >
                  Salir
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold py-2.5 px-5 transition"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
