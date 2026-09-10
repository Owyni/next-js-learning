import Link from "next/link";
import { redirect } from "next/navigation";
import Header from "@/src/components/Header";
import { getCurrentUser } from "@/src/lib/auth";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="rounded-3xl border border-gray-200 bg-white/90 p-8 shadow-lg shadow-cyan-900/5">
          <p className="text-sm font-semibold text-cyan-600">Mi cuenta</p>
          <h1 className="text-3xl font-bold text-gray-950 mt-2">Hola, {user.name}</h1>
          <p className="text-gray-500 mt-2">{user.email}</p>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
            <Link href="/" className="rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold px-5 py-3 transition">
              Explorar espacios
            </Link>
            <Link href="/create-property" className="rounded-xl border border-gray-300 hover:border-gray-500 bg-white text-gray-800 font-semibold px-5 py-3 transition">
              Publicar una propiedad
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
