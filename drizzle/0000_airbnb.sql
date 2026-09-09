CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  host_id INTEGER NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  image TEXT NOT NULL,
  price_per_night INTEGER NOT NULL,
  guests INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  property_id INTEGER NOT NULL REFERENCES properties(id),
  guest_id INTEGER NOT NULL REFERENCES users(id),
  check_in TIMESTAMP NOT NULL,
  check_out TIMESTAMP NOT NULL,
  guests INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS reservations_property_dates_idx
  ON reservations(property_id, check_in, check_out);

INSERT INTO users (name, email)
VALUES ('Anfitrión Demo', 'demo@aquareseve.local')
ON CONFLICT (email) DO NOTHING;

INSERT INTO properties (host_id, title, description, location, image, price_per_night, guests, bedrooms)
SELECT u.id, 'Villa frente al mar', 'Disfruta una estancia tranquila con piscina y vistas increíbles al mar.', 'Tulum, México', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80', 5100, 6, 3
FROM users u WHERE u.email = 'demo@aquareseve.local'
AND NOT EXISTS (SELECT 1 FROM properties WHERE title = 'Villa frente al mar');

INSERT INTO properties (host_id, title, description, location, image, price_per_night, guests, bedrooms)
SELECT u.id, 'Cabaña entre montañas', 'Cabaña acogedora ideal para desconectarte y disfrutar la naturaleza.', 'Valle de Bravo, México', 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80', 2450, 4, 2
FROM users u WHERE u.email = 'demo@aquareseve.local'
AND NOT EXISTS (SELECT 1 FROM properties WHERE title = 'Cabaña entre montañas');

INSERT INTO properties (host_id, title, description, location, image, price_per_night, guests, bedrooms)
SELECT u.id, 'Casa con piscina privada', 'Casa moderna para pasar unos días con amigos o familia.', 'Morelia, México', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80', 3200, 8, 4
FROM users u WHERE u.email = 'demo@aquareseve.local'
AND NOT EXISTS (SELECT 1 FROM properties WHERE title = 'Casa con piscina privada');
