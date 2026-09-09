import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import { getProperties } from "../db/queries";

export const dynamic = "force-dynamic";

export default async function App() {
  const properties = await getProperties();

  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <Header />

      <main className="flex-1 w-full">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <div className="max-w-2xl mb-10">
            <p className="inline-flex items-center rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-inset ring-cyan-100">
              Estancias que se sienten como vacaciones
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-950 mt-4">
              Encuentra tu próximo lugar para desconectar.
            </h1>
            <p className="text-gray-600 mt-4 text-base sm:text-lg leading-7">
              Explora espacios únicos, conoce nuevos lugares y reserva de forma sencilla.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Espacios disponibles</h2>
              <p className="text-gray-500 text-sm mt-1">
                {properties.length} {properties.length === 1 ? "espacio disponible" : "espacios disponibles"}
              </p>
            </div>
            <Link
              href="/create-property"
              className="inline-flex w-fit items-center justify-center rounded-xl bg-gray-950 hover:bg-gray-800 text-white font-semibold py-3 px-5 transition-colors shadow-sm"
            >
              + Pon tu espacio
            </Link>
          </div>

          {properties.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white/70 py-20 px-6 text-center shadow-sm">
              <p className="text-gray-500">Todavía no hay propiedades.</p>
              <Link href="/create-property" className="text-cyan-700 font-semibold mt-2 inline-block hover:text-cyan-800">
                Publica la primera
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
