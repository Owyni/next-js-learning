import { sql } from "./index";

export type Property = {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
  pricePerNight: number;
  guests: number;
  bedrooms: number;
  hostName: string;
};

export async function getProperties(): Promise<Property[]> {
  const rows = await sql`
    SELECT p.id, p.title, p.description, p.location, p.image,
           p.price_per_night AS "pricePerNight", p.guests, p.bedrooms,
           u.name AS "hostName"
    FROM properties p
    JOIN users u ON u.id = p.host_id
    ORDER BY p.created_at DESC
  `;
  return rows as Property[];
}

export async function getProperty(id: number): Promise<Property | null> {
  const rows = await sql`
    SELECT p.id, p.title, p.description, p.location, p.image,
           p.price_per_night AS "pricePerNight", p.guests, p.bedrooms,
           u.name AS "hostName"
    FROM properties p
    JOIN users u ON u.id = p.host_id
    WHERE p.id = ${id}
    LIMIT 1
  `;
  return (rows[0] as Property | undefined) ?? null;
}

export async function getReservedRanges(propertyId: number) {
  return sql`
    SELECT check_in AS "checkIn", check_out AS "checkOut"
    FROM reservations
    WHERE property_id = ${propertyId} AND check_out >= NOW()
    ORDER BY check_in
  `;
}
