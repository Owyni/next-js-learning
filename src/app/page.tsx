import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import { getProperties } from "../db/queries";

export const dynamic = "force-dynamic";

export default async function App() {
  const properties = await getProperties();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <div className="bubble inline-flex px-4 py-2 text-sm font-black text-white mb-5">
            🫧 ¡Bienvenido a Fondo de Bikini! 🫧
          </div>

          <div className="sponge-card rounded-[2rem] p-7 sm:p-10 mb-10 overflow-hidden relative">
            <div className="absolute -right-8 -top-10 text-8xl sm:text-9xl rotate-12 select-none">🧽</div>
            <div className="relative max-w-3xl">
              <p className="text-sky-700 font-black uppercase tracking-widest text-xs sm:text-sm">
                Krusty Krab Vacations
              </p>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-sky-950 mt-3">
                ¡Encuentra tu piña perfecta bajo el mar!
              </h1>
              <p className="text-sky-900/75 mt-5 text-base sm:text-lg leading-7 max-w-2xl font-medium">
                Explora lugares increíbles, conoce nuevos vecinos y reserva tu próxima aventura en Fondo de Bikini.
              </p>
              <div className="flex flex-wrap gap-3 mt-7">
                <Link href="/create-property" className="inline-flex items-center rounded-full bg-yellow-400 hover:bg-yellow-300 text-sky-950 font-black py-3 px-6 shadow-[0_5px_0_#ca8a04] transition-transform hover:-translate-y-0.5">
                  🍔 Pon tu espacio
                </Link>
                <span className="inline-flex items-center rounded-full bg-sky-100 text-sky-800 font-bold py-3 px-5">
                  ⭐ ¡Recién salido del Krusty Krab!
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-yellow-300 font-black uppercase tracking-widest text-xs">🏝️ Lugares de Bikini Bottom</p>
              <h2 className="text-3xl font-black text-white mt-1">Espacios disponibles</h2>
              <p className="text-sky-100 text-sm mt-1 font-medium">
                {properties.length} {properties.length === 1 ? "espacio listo" : "espacios listos"} para tu próxima aventura
              </p>
            </div>
            <Link href="/create-property" className="inline-flex w-fit items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-300 text-sky-950 font-black py-3 px-5 shadow-[0_4px_0_#ca8a04]">
              🧽 + Publicar propiedad
            </Link>
          </div>

          {properties.length === 0 ? (
            <div className="sponge-card rounded-3xl py-20 px-6 text-center">
              <div className="text-6xl mb-4">🏝️</div>
              <p className="text-sky-900 font-black text-lg">¡Vaya! Todavía no hay propiedades.</p>
              <Link href="/create-property" className="text-sky-700 font-black mt-3 inline-block hover:text-sky-900">
                🍍 Sé el primero en publicar una
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  image={property.image}
                  location={property.title}
                  distance={property.location}
                  dates={`${property.guests} huéspedes · ${property.bedrooms} habitaciones`}
                  price={property.pricePerNight.toLocaleString("es-MX")}
                  rating="Nuevo"
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
