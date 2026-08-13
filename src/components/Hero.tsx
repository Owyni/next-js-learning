import React from "react";
import {
  Droplets,
  Umbrella,
  Home,
  Palmtree,
  Sun,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";

const Hero = () => {

  const categories = [
    {
      icon: <Droplets size={24} />,
      name: "Piscinas",
      active: true,
    },
    {
      icon: <Umbrella size={24} />,
      name: "Playa",
      active: false,
    },
    {
      icon: <Home size={24} />,
      name: "Cabañas",
      active: false,
    },
    {
      icon: <Palmtree size={24} />,
      name: "Tropical",
      active: false,
    },
    {
      icon: <Sun size={24} />,
      name: "Clima cálido",
      active: false,
    },
    {
      icon: <MapPin size={24} />,
      name: "Vistas",
      active: false,
    },
  ];

  return (
    <div className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm hidden md:block pt-4 pb-2">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Categories */}
        <div className="flex items-center space-x-8 overflow-x-auto scrollbar-hide py-2">

          {categories.map((category, index) => (
            <button
              key={index}
              className={`
                flex flex-col items-center gap-2
                min-w-[60px] pb-2
                transition border-b-2
                ${
                  category.active
                    ? "border-cyan-500 text-cyan-600"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                }
              `}
            >
              <div className="opacity-80">
                {category.icon}
              </div>

              <span className="text-xs font-medium">
                {category.name}
              </span>
            </button>
          ))}

        </div>

        {/* Filters */}
        <div className="hidden lg:flex pl-6 border-l border-gray-200">

          <button className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 hover:border-gray-800 transition">
            <SlidersHorizontal size={16} />

            <span className="text-sm font-medium">
              Filtros
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};

export default Hero;