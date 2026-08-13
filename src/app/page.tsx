import React from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

import PropertyCard from "../components/PropertyCard";

const App = () => {

  const properties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Santorini, Grecia",
      distance: "A 2.534 km de distancia",
      dates: "15-20 de oct.",
      price: "2,450",
      rating: "4.98",
      badge: "Favorito de los huéspedes",
      isFavorite: true,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Tulum, México",
      distance: "Diseñado por Arquitectura Studio",
      dates: "2-7 de nov.",
      price: "5,100",
      rating: "4.92",
      isFavorite: false,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Bora Bora, Polinesia",
      distance: "Vistas al arrecife",
      dates: "10-15 de dic.",
      price: "12,300",
      rating: "5.0",
      isFavorite: false,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Cabo San Lucas, México",
      distance: "A pie de playa",
      dates: "22-27 de nov.",
      price: "4,800",
      rating: "Nuevo",
      badge: "Nuevo",
      isFavorite: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">

      <Header />

      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
            />
          ))}

        </div>

        <div className="mt-12 mb-8 flex justify-center">
          <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
            Mostrar más espacios
          </button>
        </div>

      </main>

      <Footer />

    </div>
  );
};

export default App;