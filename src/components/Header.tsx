import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-cyan-600" aria-label="AquaReserve inicio">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 1.5c4.556 0 8.25 3.694 8.25 8.25s-3.694 8.25-8.25 8.25-8.25-3.694-8.25-8.25 3.694-8.25 8.25-8.25zm-2.25 4.5v1.5h4.5v-1.5h-4.5zm0 3v1.5h4.5v-1.5h-4.5zm0 3v1.5h4.5v-1.5h-4.5z" />
          </svg>
          <span className="font-bold text-2xl tracking-tight">AquaReserve</span>
        </Link>

        <Link
          href="/create-property"
          className="rounded-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-2.5 px-5 transition"
        >
          Pon tu espacio
        </Link>
      </div>
    </header>
  );
};

export default Header;
