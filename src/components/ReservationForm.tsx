"use client";

import { useMemo, useState } from "react";

export default function ReservationForm({ propertyId, pricePerNight, maxGuests }: { propertyId: number; pricePerNight: number; maxGuests: number }) {
  const [form, setForm] = useState({ name: "", email: "", checkIn: "", checkOut: "", guests: "1" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    const diff = new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime();
    return diff > 0 ? Math.ceil(diff / 86400000) : 0;
  }, [form.checkIn, form.checkOut]);

  const total = nights * pricePerNight;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, propertyId, guests: Number(form.guests) }),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data.error ?? "No se pudo reservar.");
      return;
    }

    setMessage(`¡Reserva confirmada! Total: $${data.totalPrice.toLocaleString("es-MX")} MXN.`);
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-gray-200 p-6 shadow-lg bg-white sticky top-28">
      <div className="text-2xl font-semibold mb-5">$ {pricePerNight.toLocaleString("es-MX")} <span className="text-sm font-normal text-gray-500">MXN / noche</span></div>
      <div className="grid grid-cols-2 border border-gray-300 rounded-xl overflow-hidden mb-4">
        <label className="p-3 border-r border-gray-300 text-xs font-semibold">LLEGADA<input required type="date" min={new Date().toISOString().split("T")[0]} value={form.checkIn} onChange={e => setForm({ ...form, checkIn: e.target.value })} className="block w-full text-sm font-normal mt-1 outline-none" /></label>
        <label className="p-3 text-xs font-semibold">SALIDA<input required type="date" min={form.checkIn || new Date().toISOString().split("T")[0]} value={form.checkOut} onChange={e => setForm({ ...form, checkOut: e.target.value })} className="block w-full text-sm font-normal mt-1 outline-none" /></label>
      </div>
      <label className="block text-xs font-semibold border border-gray-300 rounded-xl p-3 mb-4">HUÉSPEDES<select value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} className="block w-full text-sm font-normal mt-1 bg-transparent outline-none">{Array.from({ length: maxGuests }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} huésped{i ? "es" : ""}</option>)}</select></label>
      <input required placeholder="Tu nombre" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-xl p-3 mb-3 outline-none focus:ring-2 focus:ring-cyan-500" />
      <input required type="email" placeholder="Correo electrónico" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-cyan-500" />
      {nights > 0 && <div className="flex justify-between text-sm mb-4"><span>${pricePerNight.toLocaleString("es-MX")} × {nights} noches</span><strong>${total.toLocaleString("es-MX")} MXN</strong></div>}
      <button disabled={loading || nights === 0} className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-300 text-white font-semibold py-3 transition">{loading ? "Reservando..." : "Reservar"}</button>
      {message && <p className="mt-4 text-sm font-medium text-gray-700">{message}</p>}
    </form>
  );
}
