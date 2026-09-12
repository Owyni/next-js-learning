const Footer = () => {
  return (
    <footer className="border-t-4 border-yellow-400 bg-sky-950/90 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 font-bold">
          <span className="w-8 h-8 rounded-xl bg-yellow-400 text-sky-950 inline-flex items-center justify-center text-lg">🧽</span>
          <span>© 2026 BikiniReserve</span>
        </div>
        <span className="text-sky-200">🍍 Hecho bajo el mar · Estancias en México</span>
      </div>
    </footer>
  );
};

export default Footer;
