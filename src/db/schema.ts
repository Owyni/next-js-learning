import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  hostId: integer("host_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  image: text("image").notNull(),
  pricePerNight: integer("price_per_night").notNull(),
  guests: integer("guests").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull().references(() => properties.id),
  guestId: integer("guest_id").notNull().references(() => users.id),
  checkIn: timestamp("check_in").notNull(),
  checkOut: timestamp("check_out").notNull(),
  guests: integer("guests").notNull(),
  totalPrice: integer("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  properties: many(properties),
  reservations: many(reservations),
}));

export const propertyRelations = relations(properties, ({ one, many }) => ({
  host: one(users, { fields: [properties.hostId], references: [users.id] }),
  reservations: many(reservations),
}));

export const reservationRelations = relations(reservations, ({ one }) => ({
  property: one(properties, { fields: [reservations.propertyId], references: [properties.id] }),
  guest: one(users, { fields: [reservations.guestId], references: [users.id] }),
}));
