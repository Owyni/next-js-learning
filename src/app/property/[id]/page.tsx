import { notFound } from "next/navigation";
import Header from "@/src/components/Header";
import ReservationForm from "@/src/components/ReservationForm";
import { getProperty } from "@/src/db/queries";

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getProperty(Number(id));
  if (!property) notFound();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <p className="text-gray-600 mt-2">📍 {property.location} · ★ 4.9</p>
        </div>
        <img src={property.image} alt={property.title} className="w-full aspect-[16/7] object-cover rounded-3xl" />
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 mt-10">
          <section>
            <h2 className="text-2xl font-semibold">Alojamiento completo</h2>
            <p className="text-gray-600 mt-4 leading-7">{property.description}</p>
            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="rounded-xl bg-gray-50 p-4"><strong>{property.guests}</strong><span className="block text-sm text-gray-500">huéspedes</span></div>
              <div className="rounded-xl bg-gray-50 p-4"><strong>{property.bedrooms}</strong><span className="block text-sm text-gray-500">habitaciones</span></div>
              <div className="rounded-xl bg-gray-50 p-4"><strong>{property.hostName}</strong><span className="block text-sm text-gray-500">anfitrión</span></div>
            </div>
          </section>
          <ReservationForm propertyId={property.id} pricePerNight={property.pricePerNight} maxGuests={property.guests} />
        </div>
      </main>
    </div>
  );
}
