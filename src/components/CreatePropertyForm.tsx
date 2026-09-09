"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePropertyForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", title: "", description: "", location: "", image: "", pricePerNight: "", guests: "1", bedrooms: "1" });

  const update = (key: string, value: string) => setForm(current => ({ ...current, [key]: value }));

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    const response = await fetch("/api/properties", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await response.json(); setLoading(false);
    if (!response.ok) { setError(data.error ?? "No se pudo publicar."); return; }
    router.push(`/property/${data.id}`);
  }

  return <form onSubmit={submit} className="space-y-5 max-w-2xl">
    <div className="grid sm:grid-cols-2 gap-4">
      <input required placeholder="Tu nombre" value={form.name} onChange={e => update("name", e.target.value)} className="input" />
      <input required type="email" placeholder="Tu correo" value={form.email} onChange={e => update("email", e.target.value)} className="input" />
    </div>
    <input required placeholder="Título de la propiedad" value={form.title} onChange={e => update("title", e.target.value)} className="input" />
    <textarea required placeholder="Describe tu espacio" rows={5} value={form.description} onChange={e => update("description", e.target.value)} className="input" />
    <input required placeholder="Ubicación (ej. Morelia, México)" value={form.location} onChange={e => update("location", e.target.value)} className="input" />
    <input required type="url" placeholder="URL de una imagen" value={form.image} onChange={e => update("image", e.target.value)} className="input" />
    <div className="grid grid-cols-3 gap-4">
      <input required type="number" min="1" placeholder="Precio/noche" value={form.pricePerNight} onChange={e => update("pricePerNight", e.target.value)} className="input" />
      <input required type="number" min="1" placeholder="Huéspedes" value={form.guests} onChange={e => update("guests", e.target.value)} className="input" />
      <input required type="number" min="1" placeholder="Habitaciones" value={form.bedrooms} onChange={e => update("bedrooms", e.target.value)} className="input" />
    </div>
    {error && <p className="text-red-600 text-sm">{error}</p>}
    <button disabled={loading} className="rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-300 text-white font-semibold px-6 py-3">{loading ? "Publicando..." : "Publicar propiedad"}</button>
  </form>;
}
