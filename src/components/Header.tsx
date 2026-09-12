import Link from "next/link";
import { getCurrentUser } from "@/src/lib/auth";

const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 bg-sky-950/90 backdrop-blur-md border-b-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Fondo de Bikini inicio">
          <div className="w-11 h-11 rounded-2xl bg-yellow-400 text-sky-950 flex items-center justify-center shadow-[0_4px_0_#ca8a04] group-hover:-rotate-6 transition-transform">
            <span className="text-2xl">🧽</span>
          </div>
          <span className="font-black text-2xl tracking-tight text-yellow-300">BikiniReserve</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/create-property" className="hidden md:inline-flex rounded-full bg-yellow-400 hover:bg-yellow-300 text-sky-950 text-sm font-black py-2.5 px-5 shadow-[0_3px_0_#ca8a04] transition-transform hover:-translate-y-0.5">
            🍍 Pon tu piña
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/account" className="flex items-center gap-2 rounded-full bg-white text-sky-950 text-sm font-black py-2 pl-2 pr-4 hover:bg-yellow-100 transition-all">
                <span className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center">{user.name.charAt(0).toUpperCase()}</span>
                <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="hidden sm:inline-flex rounded-full bg-sky-800 hover:bg-sky-700 text-white text-sm font-bold py-2.5 px-4 transition">Salir</button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link href="/login" className="rounded-full text-white hover:bg-white/10 text-sm font-bold py-2.5 px-3 sm:px-4 transition">Iniciar sesión</Link>
              <Link href="/login?mode=register" className="rounded-full bg-yellow-400 hover:bg-yellow-300 text-sky-950 text-sm font-black py-2.5 px-4 sm:px-5 shadow-[0_3px_0_#ca8a04] transition">Registrarse</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
