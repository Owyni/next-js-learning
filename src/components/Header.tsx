import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="AquaReserve inicio">
          <div className="w-9 h-9 rounded-xl bg-cyan-500 text-white flex items-center justify-center shadow-sm group-hover:bg-cyan-600 transition-colors">
            <span className="text-lg font-bold">A</span>
          </div>
          <span className="font-bold text-2xl tracking-tight text-gray-950">AquaReserve</span>
        </Link>

        <Link
          href="/create-property"
          className="rounded-full border border-gray-300 bg-white hover:border-gray-500 hover:shadow-sm text-gray-800 text-sm font-semibold py-2.5 px-5 transition-all"
        >
          Pon tu espacio
        </Link>
      </div>
    </header>
  );
};

export default Header;
