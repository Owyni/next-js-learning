import React from "react";
import {
  Search,
  Globe,
  User,
  Menu,
} from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer text-cyan-600">
            <svg
              className="w-8 h-8 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 1.5c4.556 0 8.25 3.694 8.25 8.25s-3.694 8.25-8.25 8.25-8.25-3.694-8.25-8.25 3.694-8.25 8.25-8.25zm-2.25 4.5v1.5h4.5v-1.5h-4.5zm0 3v1.5h4.5v-1.5h-4.5zm0 3v1.5h4.5v-1.5h-4.5z" />
            </svg>

            <span className="font-bold text-2xl tracking-tight hidden sm:block">
              AquaReserve
            </span>
          </div>

          {/* Search Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="flex items-center w-full bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 p-1 cursor-pointer">

              <button className="flex-1 font-medium text-sm text-gray-800 px-4 border-r border-gray-300 hover:text-cyan-600">
                Cualquier lugar
              </button>

              <button className="flex-1 font-medium text-sm text-gray-800 px-4 border-r border-gray-300 hover:text-cyan-600">
                Cualquier semana
              </button>

              <div className="flex-1 flex items-center justify-between pl-4 pr-1">
                <button className="font-normal text-sm text-gray-500 hover:text-gray-800 truncate">
                  ¿Cuántos?
                </button>

                <div className="bg-cyan-500 rounded-full p-2 text-white ml-2 hover:bg-cyan-600 transition">
                  <Search size={16} strokeWidth={3} />
                </div>
              </div>

            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center justify-end">

            <a
              href="#"
              className="hidden lg:block text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full py-2 px-4 transition"
            >
              Pon tu espacio
            </a>

            <button className="hidden lg:block p-2 text-gray-700 hover:bg-gray-100 rounded-full mx-1 transition">
              <Globe size={20} />
            </button>

            <div className="flex items-center border border-gray-300 rounded-full p-1 pl-3 hover:shadow-md transition cursor-pointer bg-white ml-2 gap-2">
              <Menu size={18} className="text-gray-600" />

              <div className="bg-gray-500 text-white rounded-full p-1 border border-white">
                <User size={20} />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex items-center w-full bg-white border border-gray-300 rounded-full shadow-sm py-3 px-4 gap-3 cursor-pointer">

          <Search size={20} className="text-gray-800" />

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              ¿A dónde vas?
            </span>

            <span className="text-xs text-gray-500">
              Cualquier lugar • Cualquier semana
            </span>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;