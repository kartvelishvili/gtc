-- ============================================================
-- Bolero & Co — Supabase PostgreSQL Schema
-- Migrated from: NestJS + TypeORM + MySQL
-- ============================================================

-- ─── Custom Types ───────────────────────────────────────────

CREATE TYPE blog_type AS ENUM ('about-us', 'normal');
CREATE TYPE glass_type AS ENUM ('wine', 'burgundy', 'cordial', 'champagne', 'cognac');

-- ─── Users ──────────────────────────────────────────────────

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Files (storage references) ────────────────────────────

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Products ───────────────────────────────────────────────

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name JSONB NOT NULL DEFAULT '{"en":"","ge":"","ru":""}',
  image_id INT NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Product Categories ────────────────────────────────────

CREATE TABLE product_categories (
  id SERIAL PRIMARY KEY,
  name JSONB NOT NULL DEFAULT '{"en":"","ge":"","ru":""}',
  product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Companies ──────────────────────────────────────────────

CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  file_id INT NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  secondary_file_id INT REFERENCES files(id) ON DELETE SET NULL,
  active_file_id INT REFERENCES files(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Foods ──────────────────────────────────────────────────

CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  name JSONB NOT NULL DEFAULT '{"en":"","ge":"","ru":""}',
  image_id INT NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Product Items ──────────────────────────────────────────

CREATE TABLE product_items (
  id SERIAL PRIMARY KEY,
  name JSONB NOT NULL DEFAULT '{"en":"","ge":"","ru":""}',
  image_id INT NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  description JSONB NOT NULL DEFAULT '{"en":"","ge":"","ru":""}',
  alcohol NUMERIC NOT NULL DEFAULT 0,
  temperature VARCHAR NOT NULL DEFAULT '',
  color JSONB NOT NULL DEFAULT '{"en":"","ge":"","ru":""}',
  vinification_id INT NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  fruit_tones NUMERIC NOT NULL DEFAULT 0,
  tannins NUMERIC NOT NULL DEFAULT 0,
  sweetness NUMERIC NOT NULL DEFAULT 0,
  body NUMERIC NOT NULL DEFAULT 0,
  glass glass_type NOT NULL DEFAULT 'wine',
  product_category_id INT NOT NULL REFERENCES product_categories(id) ON DELETE CASCADE,
  company_id INT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  composition JSONB,
  viticulture JSONB,
  aged JSONB,
  volume JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Blogs ──────────────────────────────────────────────────

CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title JSONB NOT NULL DEFAULT '{"en":"","ge":"","ru":""}',
  description JSONB NOT NULL DEFAULT '{"en":"","ge":"","ru":""}',
  file_id INT NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  type blog_type NOT NULL DEFAULT 'normal',
  visible_on_home BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Management Teams ───────────────────────────────────────

CREATE TABLE management_teams (
  id SERIAL PRIMARY KEY,
  first_name JSONB NOT NULL DEFAULT '{"en":"","ge":"","ru":""}',
  last_name JSONB NOT NULL DEFAULT '{"en":"","ge":"","ru":""}',
  image_id INT NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  profession JSONB NOT NULL DEFAULT '{"en":"","ge":"","ru":""}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Contact Us ─────────────────────────────────────────────

CREATE TABLE contact_us (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  phone_number VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Join Tables ────────────────────────────────────────────

-- Blog ↔ File (gallery images)
CREATE TABLE blog_files (
  blog_id INT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  file_id INT NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_id, file_id)
);

-- Food ↔ ProductItem (food pairing)
CREATE TABLE food_items_product_items (
  food_id INT NOT NULL REFERENCES foods(id) ON DELETE CASCADE,
  product_item_id INT NOT NULL REFERENCES product_items(id) ON DELETE CASCADE,
  PRIMARY KEY (food_id, product_item_id)
);

-- ProductItem ↔ File (awards)
CREATE TABLE product_items_awards (
  product_item_id INT NOT NULL REFERENCES product_items(id) ON DELETE CASCADE,
  file_id INT NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  PRIMARY KEY (product_item_id, file_id)
);

-- ProductItem ↔ File (additional images)
CREATE TABLE product_items_images (
  product_item_id INT NOT NULL REFERENCES product_items(id) ON DELETE CASCADE,
  file_id INT NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  PRIMARY KEY (product_item_id, file_id)
);

-- ─── Indexes ────────────────────────────────────────────────

CREATE INDEX idx_files_user_id ON files(user_id);
CREATE INDEX idx_products_image_id ON products(image_id);
CREATE INDEX idx_product_categories_product_id ON product_categories(product_id);
CREATE INDEX idx_product_items_category ON product_items(product_category_id);
CREATE INDEX idx_product_items_company ON product_items(company_id);
CREATE INDEX idx_product_items_popular ON product_items(is_popular) WHERE is_popular = true;
CREATE INDEX idx_blogs_type ON blogs(type);
CREATE INDEX idx_blogs_visible ON blogs(visible_on_home) WHERE visible_on_home = true;
CREATE INDEX idx_companies_file ON companies(file_id);

-- ─── Row Level Security ─────────────────────────────────────

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE management_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_items_product_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_items_awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_items_images ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables (anonymous users can view)
CREATE POLICY "Public read products" ON products FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public read product_categories" ON product_categories FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public read product_items" ON product_items FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public read companies" ON companies FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public read blogs" ON blogs FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public read foods" ON foods FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public read management_teams" ON management_teams FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public read files" ON files FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public read blog_files" ON blog_files FOR SELECT USING (true);
CREATE POLICY "Public read food_items_product_items" ON food_items_product_items FOR SELECT USING (true);
CREATE POLICY "Public read product_items_awards" ON product_items_awards FOR SELECT USING (true);
CREATE POLICY "Public read product_items_images" ON product_items_images FOR SELECT USING (true);

-- Public insert for contact us (anyone can submit)
CREATE POLICY "Public insert contact_us" ON contact_us FOR INSERT WITH CHECK (true);

-- Authenticated admin full access
CREATE POLICY "Admin full access users" ON users FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access files" ON files FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access product_categories" ON product_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access product_items" ON product_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access companies" ON companies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access blogs" ON blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access foods" ON foods FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access management_teams" ON management_teams FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access contact_us" ON contact_us FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access blog_files" ON blog_files FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access food_items_product_items" ON food_items_product_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access product_items_awards" ON product_items_awards FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access product_items_images" ON product_items_images FOR ALL USING (auth.role() = 'authenticated');

-- ─── Storage Bucket ─────────────────────────────────────────
-- Run this in the Supabase dashboard SQL editor:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);
-- CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
-- CREATE POLICY "Auth upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
-- CREATE POLICY "Auth update media" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
-- CREATE POLICY "Auth delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- ─── Updated_at Trigger ─────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_users BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_files BEFORE UPDATE ON files FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_products BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_product_categories BEFORE UPDATE ON product_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_product_items BEFORE UPDATE ON product_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_companies BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_blogs BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_foods BEFORE UPDATE ON foods FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_management_teams BEFORE UPDATE ON management_teams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at_contact_us BEFORE UPDATE ON contact_us FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
