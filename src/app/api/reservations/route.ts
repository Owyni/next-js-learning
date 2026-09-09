import { NextResponse } from "next/server";
import { sql } from "@/src/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { propertyId, name, email, checkIn, checkOut, guests } = body;

    if (!propertyId || !name || !email || !checkIn || !checkOut || !guests) {
      return NextResponse.json({ error: "Completa todos los campos." }, { status: 400 });
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / 86400000);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || nights <= 0) {
      return NextResponse.json({ error: "Las fechas no son válidas." }, { status: 400 });
    }

    const conflicts = await sql`
      SELECT id FROM reservations
      WHERE property_id = ${Number(propertyId)}
        AND check_in < ${end}
        AND check_out > ${start}
      LIMIT 1
    `;

    if (conflicts.length) {
      return NextResponse.json({ error: "La propiedad ya está reservada en esas fechas." }, { status: 409 });
    }

    const property = await sql`
      SELECT price_per_night, guests FROM properties WHERE id = ${Number(propertyId)} LIMIT 1
    `;

    if (!property.length) {
      return NextResponse.json({ error: "Propiedad no encontrada." }, { status: 404 });
    }

    if (Number(guests) > Number(property[0].guests)) {
      return NextResponse.json({ error: `Esta propiedad admite máximo ${property[0].guests} huéspedes.` }, { status: 400 });
    }

    const users = await sql`
      INSERT INTO users (name, email)
      VALUES (${name}, ${email})
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
      RETURNING id
    `;

    const totalPrice = nights * Number(property[0].price_per_night);

    const reservation = await sql`
      INSERT INTO reservations
        (property_id, guest_id, check_in, check_out, guests, total_price)
      VALUES
        (${Number(propertyId)}, ${users[0].id}, ${start}, ${end}, ${Number(guests)}, ${totalPrice})
      RETURNING id
    `;

    return NextResponse.json({ id: reservation[0].id, totalPrice, nights }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudo crear la reserva." }, { status: 500 });
  }
}
