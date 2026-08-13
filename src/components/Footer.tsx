import React from "react";
import { Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8 mt-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-sm">

          {/* Asistencia */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Asistencia
            </h4>

            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Centro de ayuda
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Opciones de cancelación
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Apoyo a personas con discapacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Comunidad
            </h4>

            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  AquaReserve.org: alojamiento de ayuda
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Apoyo a comunidades costeras
                </a>
              </li>
            </ul>
          </div>

          {/* Acerca de nosotros */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Acerca de nosotros
            </h4>

            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Cómo funciona AquaReserve
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Inversores
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Empleo
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-200 mb-6"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">

          {/* Copyright */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-2 gap-y-1">

            <span className="text-gray-600">
              © 2026 AquaReserve, Inc.
            </span>

            <span className="hidden md:inline text-gray-400">
              •
            </span>

            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              Privacidad
            </a>

            <span className="text-gray-400">
              •
            </span>

            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              Términos
            </a>

            <span className="text-gray-400">
              •
            </span>

            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              Mapa del sitio
            </a>

          </div>

          {/* Language / Currency */}
          <div className="flex items-center gap-6">

            <button className="flex items-center gap-1 text-gray-800 font-medium hover:underline">
              <Globe size={16} />
              <span>Español (MX)</span>
            </button>

            <button className="flex items-center gap-1 text-gray-800 font-medium hover:underline">
              <span>$</span>
              <span>MXN</span>
            </button>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;