import Link from "next/link";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import { getProperties } from "../db/queries";

export default async function App() {
  const properties = await getProperties();

  return <div className="min-h-screen bg-white font-sans text-gray-800">
    <Header />
    <Hero />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Explora espacios</h1><p className="text-gray-500 text-sm mt-1">Encuentra tu próxima estancia.</p></div>
        <Link href="/create-property" className="rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-5 transition">+ Pon tu espacio</Link>
      </div>
      {properties.length === 0 ? <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center"><p className="text-gray-500">Todavía no hay propiedades.</p><Link href="/create-property" className="text-cyan-600 font-semibold mt-2 inline-block">Publica la primera</Link></div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{properties.map(property => <PropertyCard key={property.id} id={property.id} image={property.image} location={property.title} distance={property.location} dates={`${property.guests} huéspedes · ${property.bedrooms} habitaciones`} price={property.pricePerNight.toLocaleString("es-MX")} rating="Nuevo" />)}</div>}
    </main>
    <Footer />
  </div>;
}
