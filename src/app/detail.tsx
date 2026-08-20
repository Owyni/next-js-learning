"use client";

import React, { useState } from "react";
import {
  Heart,
  Star,
  MapPin,
  BedDouble,
  Bath,
  Users,
  Wifi,
  Wind,
  Tv,
  Car,
  Check,
  ArrowLeft,
} from "lucide-react";

const Detail = () => {
  const [liked, setLiked] = useState(false);

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition">
          <ArrowLeft size={18} />
          Volver
        </button>
      </div>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="relative overflow-hidden rounded-2xl h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80"
            alt="Habitación en renta"
            className="w-full h-full object-cover"
          />

          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-sm hover:scale-105 transition"
            aria-label="Agregar a favoritos"
          >
            <Heart
              size={22}
              className={
                liked
                  ? "fill-red-500 text-red-500"
                  : "text-gray-900"
              }
            />
          </button>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left column */}
          <div className="lg:col-span-2">
            {/* Title */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                    Habitación privada en Morelia
                  </h1>

                  <div className="flex items-center gap-2 mt-2 text-gray-500">
                    <MapPin size={17} />
                    <span>Morelia, Michoacán, México</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-gray-900">
                  <Star
                    size={17}
                    className="fill-gray-900 text-gray-900"
                  />
                  <span className="font-medium">4.92</span>
                  <span className="text-gray-500">
                    · 18 reseñas
                  </span>
                </div>
              </div>
            </div>

            {/* Room details */}
            <div className="py-7 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-5">
                Detalles de la habitación
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="border border-gray-200 rounded-xl p-4">
                  <BedDouble size={22} className="mb-3" />
                  <p className="font-medium text-gray-900">
                    1 cama
                  </p>
                  <p className="text-sm text-gray-500">
                    Matrimonial
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <Bath size={22} className="mb-3" />
                  <p className="font-medium text-gray-900">
                    Baño privado
                  </p>
                  <p className="text-sm text-gray-500">
                    Completo
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <Users size={22} className="mb-3" />
                  <p className="font-medium text-gray-900">
                    1 huésped
                  </p>
                  <p className="text-sm text-gray-500">
                    Capacidad máxima
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <Wind size={22} className="mb-3" />
                  <p className="font-medium text-gray-900">
                    Aire acondicionado
                  </p>
                  <p className="text-sm text-gray-500">
                    Incluido
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="py-7 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Sobre esta habitación
              </h2>

              <p className="text-gray-600 leading-7">
                Disfruta de una habitación cómoda y privada en una
                excelente ubicación. El espacio está pensado para
                estancias cortas o largas, con todo lo necesario para
                trabajar, descansar y sentirte como en casa.
              </p>
            </div>

            {/* Amenities */}
            <div className="py-7 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-5">
                Lo que incluye
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Wifi size={20} />
                  <span>Wi-Fi de alta velocidad</span>
                </div>

                <div className="flex items-center gap-3">
                  <Wind size={20} />
                  <span>Aire acondicionado</span>
                </div>

                <div className="flex items-center gap-3">
                  <Tv size={20} />
                  <span>Televisión</span>
                </div>

                <div className="flex items-center gap-3">
                  <Car size={20} />
                  <span>Estacionamiento</span>
                </div>

                <div className="flex items-center gap-3">
                  <Check size={20} />
                  <span>Cocina compartida</span>
                </div>

                <div className="flex items-center gap-3">
                  <Check size={20} />
                  <span>Espacio de trabajo</span>
                </div>
              </div>
            </div>

            {/* Host */}
            <div className="py-7">
              <h2 className="text-xl font-semibold text-gray-900 mb-5">
                Tu anfitrión
              </h2>

              <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">
                  J
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Juan
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Anfitrión desde 2025
                  </p>

                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <Star
                      size={14}
                      className="fill-gray-900 text-gray-900"
                    />
                    <span>4.9 valoración</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking card */}
          <aside>
            <div className="lg:sticky lg:top-6 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-2xl font-semibold text-gray-900">
                  $1,200 MXN
                </span>
                <span className="text-gray-500">
                  / noche
                </span>
              </div>

              {/* Dates */}
              <div className="border border-gray-300 rounded-xl overflow-hidden mb-4">
                <div className="grid grid-cols-2">
                  <div className="p-4 border-r border-gray-300">
                    <p className="text-xs font-semibold uppercase text-gray-500">
                      Entrada
                    </p>
                    <p className="text-sm mt-1 text-gray-900">
                      15 oct. 2026
                    </p>
                  </div>

                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase text-gray-500">
                      Salida
                    </p>
                    <p className="text-sm mt-1 text-gray-900">
                      20 oct. 2026
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-300 p-4">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Huéspedes
                  </p>
                  <p className="text-sm mt-1 text-gray-900">
                    1 huésped
                  </p>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    $1,200 × 5 noches
                  </span>
                  <span>$6,000</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Limpieza
                  </span>
                  <span>$350</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Comisión
                  </span>
                  <span>$620</span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between font-semibold">
                <span>Total</span>
                <span>$6,970 MXN</span>
              </div>

              <button className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3.5 rounded-xl transition">
                Reservar habitación
              </button>

              <p className="text-center text-xs text-gray-500 mt-3">
                No se te cobrará todavía
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Detail;