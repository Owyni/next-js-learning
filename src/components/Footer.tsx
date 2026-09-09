const Footer = () => {
  return (
    <footer className="border-t border-gray-200/80 bg-white/60 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="w-6 h-6 rounded-lg bg-cyan-500 text-white inline-flex items-center justify-center text-xs font-bold">A</span>
          <span>© 2026 AquaReserve</span>
        </div>
        <span className="text-gray-500">Estancias y espacios en México</span>
      </div>
    </footer>
  );
};

export default Footer;
