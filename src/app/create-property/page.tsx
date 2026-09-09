import Link from "next/link";
import Header from "@/src/components/Header";
import CreatePropertyForm from "@/src/components/CreatePropertyForm";

export default function CreatePropertyPage() {
  return <div className="min-h-screen bg-white text-gray-900">
    <Header />
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/" className="text-sm text-cyan-600 hover:underline">← Volver a explorar</Link>
      <h1 className="text-4xl font-bold mt-6">Pon tu espacio en AquaReserve</h1>
      <p className="text-gray-600 mt-3 mb-10">Publica una propiedad para que otros usuarios puedan reservarla.</p>
      <CreatePropertyForm />
    </main>
  </div>;
}
