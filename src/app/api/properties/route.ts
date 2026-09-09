import { NextResponse } from "next/server";
import { sql } from "@/src/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, title, description, location, image, pricePerNight, guests, bedrooms } = body;

    if (!name || !email || !title || !description || !location || !image || !pricePerNight || !guests || !bedrooms) {
      return NextResponse.json({ error: "Completa todos los campos." }, { status: 400 });
    }

    const users = await sql`
      INSERT INTO users (name, email)
      VALUES (${name}, ${email})
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
      RETURNING id
    `;

    const properties = await sql`
      INSERT INTO properties
        (host_id, title, description, location, image, price_per_night, guests, bedrooms)
      VALUES
        (${users[0].id}, ${title}, ${description}, ${location}, ${image}, ${Number(pricePerNight)}, ${Number(guests)}, ${Number(bedrooms)})
      RETURNING id
    `;

    return NextResponse.json({ id: properties[0].id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudo crear la propiedad." }, { status: 500 });
  }
}
