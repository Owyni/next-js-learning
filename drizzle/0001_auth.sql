ALTER TABLE users
ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Existing demo users intentionally keep password_hash = NULL.
-- New accounts created through the app receive a secure password hash.
