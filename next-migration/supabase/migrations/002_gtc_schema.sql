-- ============================================================
-- GTC Group — Supabase PostgreSQL Schema
-- Modernization: Construction/Engineering B2B Platform
-- ============================================================

-- ─── Drop old wine-specific types ───────────────────────────
-- (Only run if migrating from Bolero schema)
-- DROP TYPE IF EXISTS glass_type CASCADE;
-- DROP TYPE IF EXISTS blog_type CASCADE;

-- ─── Custom Types ───────────────────────────────────────────

CREATE TYPE news_category AS ENUM (
  'company',
  'products',
  'projects',
  'events',
  'other'
);

CREATE TYPE project_category AS ENUM (
  'residential',
  'commercial',
  'infrastructure',
  'stadium',
  'industrial',
  'other'
);

CREATE TYPE service_slug AS ENUM (
  'engineering',
  'consulting',
  'rental',
  'optimization'
);

-- ─── Users ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Files (storage references) ────────────────────────────

CREATE TABLE IF NOT EXISTS files (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  alt_text JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Product Categories ─────────────────────────────────────

CREATE TABLE product_categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR NOT NULL UNIQUE,
  name JSONB NOT NULL DEFAULT '{"ka":"","en":"","ru":""}',
  description JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  image_id INT REFERENCES files(id) ON DELETE SET NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Brands / Manufacturers ────────────────────────────────

CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR NOT NULL UNIQUE,
  logo_id INT REFERENCES files(id) ON DELETE SET NULL,
  website_url TEXT,
  is_partner BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Products ───────────────────────────────────────────────

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  slug VARCHAR NOT NULL UNIQUE,
  name JSONB NOT NULL DEFAULT '{"ka":"","en":"","ru":""}',
  description JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  short_description JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  specifications JSONB DEFAULT '[]',
  -- specifications format: [{"key":"Weight","value":"23kg"},{"key":"Pressure","value":"80kN/m²"}]
  image_id INT REFERENCES files(id) ON DELETE SET NULL,
  category_id INT NOT NULL REFERENCES product_categories(id) ON DELETE CASCADE,
  brand_id INT REFERENCES brands(id) ON DELETE SET NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  meta_title JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  meta_description JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Product Images (gallery) ───────────────────────────────

CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  file_id INT NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  UNIQUE (product_id, file_id)
);

-- ─── Product Documents (PDFs, tech sheets) ──────────────────

CREATE TABLE product_documents (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  file_id INT NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  title JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  sort_order INT NOT NULL DEFAULT 0
);

-- ─── Services ───────────────────────────────────────────────

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  slug service_slug NOT NULL UNIQUE,
  name JSONB NOT NULL DEFAULT '{"ka":"","en":"","ru":""}',
  short_description JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  description JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  icon VARCHAR DEFAULT '',
  image_id INT REFERENCES files(id) ON DELETE SET NULL,
  benefits JSONB DEFAULT '[]',
  -- benefits format: [{"ka":"...","en":"...","ru":"..."}]
  sort_order INT NOT NULL DEFAULT 0,
  meta_title JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  meta_description JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Projects ───────────────────────────────────────────────

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  slug VARCHAR NOT NULL UNIQUE,
  name JSONB NOT NULL DEFAULT '{"ka":"","en":"","ru":""}',
  description JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  short_description JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  client JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  contractor JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  location JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  category project_category NOT NULL DEFAULT 'other',
  start_date DATE,
  end_date DATE,
  image_id INT REFERENCES files(id) ON DELETE SET NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  meta_title JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  meta_description JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── Project Images (gallery) ───────────────────────────────

CREATE TABLE project_images (
  id SERIAL PRIMARY KEY,
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  file_id INT NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  UNIQUE (project_id, file_id)
);

-- ─── Project ↔ Product (used systems) ───────────────────────

CREATE TABLE project_products (
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, product_id)
);

-- ─── Project ↔ Service ──────────────────────────────────────

CREATE TABLE project_services (
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  service_id INT NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, service_id)
);

-- ─── News ───────────────────────────────────────────────────

CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  slug VARCHAR NOT NULL UNIQUE,
  title JSONB NOT NULL DEFAULT '{"ka":"","en":"","ru":""}',
  description JSONB NOT NULL DEFAULT '{"ka":"","en":"","ru":""}',
  short_description JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  category news_category NOT NULL DEFAULT 'company',
  image_id INT REFERENCES files(id) ON DELETE SET NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  meta_title JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  meta_description JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ─── News Images (gallery) ──────────────────────────────────

CREATE TABLE news_images (
  id SERIAL PRIMARY KEY,
  news_id INT NOT NULL REFERENCES news(id) ON DELETE CASCADE,
  file_id INT NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  UNIQUE (news_id, file_id)
);

-- ─── Contact Submissions ────────────────────────────────────

CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR DEFAULT '',
  subject VARCHAR DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Site Settings (KV store for dynamic content) ───────────

CREATE TABLE site_settings (
  key VARCHAR PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Hero Slides ────────────────────────────────────────────

CREATE TABLE hero_slides (
  id SERIAL PRIMARY KEY,
  title JSONB NOT NULL DEFAULT '{"ka":"","en":"","ru":""}',
  subtitle JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  cta_text JSONB DEFAULT '{"ka":"","en":"","ru":""}',
  cta_url VARCHAR DEFAULT '',
  image_id INT REFERENCES files(id) ON DELETE SET NULL,
  video_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Indexes ────────────────────────────────────────────────

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_slug ON products(slug);

CREATE INDEX idx_product_categories_slug ON product_categories(slug);
CREATE INDEX idx_product_categories_sort ON product_categories(sort_order);

CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(is_featured) WHERE is_featured = true;
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_dates ON projects(start_date, end_date);

CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_published ON news(published_at DESC);
CREATE INDEX idx_news_featured ON news(is_featured) WHERE is_featured = true;
CREATE INDEX idx_news_slug ON news(slug);

CREATE INDEX idx_services_slug ON services(slug);

CREATE INDEX idx_hero_slides_active ON hero_slides(is_active, sort_order);

CREATE INDEX idx_contact_submissions_read ON contact_submissions(is_read);
CREATE INDEX idx_contact_submissions_date ON contact_submissions(created_at DESC);

-- ─── Row Level Security ─────────────────────────────────────

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

-- ─── RLS Policies: Public Read ──────────────────────────────

-- Allow anonymous read on public content
CREATE POLICY "Public read product_categories"
  ON product_categories FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Public read brands"
  ON brands FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Public read products"
  ON products FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Public read product_images"
  ON product_images FOR SELECT USING (true);

CREATE POLICY "Public read product_documents"
  ON product_documents FOR SELECT USING (true);

CREATE POLICY "Public read services"
  ON services FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Public read projects"
  ON projects FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Public read project_images"
  ON project_images FOR SELECT USING (true);

CREATE POLICY "Public read project_products"
  ON project_products FOR SELECT USING (true);

CREATE POLICY "Public read project_services"
  ON project_services FOR SELECT USING (true);

CREATE POLICY "Public read news"
  ON news FOR SELECT USING (deleted_at IS NULL AND published_at IS NOT NULL);

CREATE POLICY "Public read news_images"
  ON news_images FOR SELECT USING (true);

CREATE POLICY "Public read files"
  ON files FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Public read hero_slides"
  ON hero_slides FOR SELECT USING (is_active = true);

CREATE POLICY "Public read site_settings"
  ON site_settings FOR SELECT USING (true);

-- Allow anonymous inserts on contact form
CREATE POLICY "Public insert contact_submissions"
  ON contact_submissions FOR INSERT WITH CHECK (true);

-- ─── Seed: Initial Services ─────────────────────────────────

INSERT INTO services (slug, name, short_description, description, icon, sort_order) VALUES
(
  'engineering',
  '{"ka":"ინჟინერია","en":"Engineering","ru":"Инженерия"}',
  '{"ka":"სრული საინჟინრო მომსახურება — სტრუქტურული ანალიზიდან ზუსტ გაანგარიშებამდე.","en":"Full engineering services — from structural analysis to precise calculations.","ru":"Полный инженерный сервис — от структурного анализа до точных расчётов."}',
  '{"ka":"ჯითისი ჯგუფი გთავაზობთ სრულ საინჟინრო მომსახურებას — პროექტის მარტივი სტრუქტურული ანალიზიდან ზუსტ გაანგარიშებამდე. ჩვენი სერთიფიცირებული ინჟინრები შეიმუშავებენ ოპტიმალურ საყალიბე გეგმას თქვენი პროექტის სპეციფიკის გათვალისწინებით.","en":"GTC Group offers comprehensive engineering services — from straightforward structural analysis to precise calculations. Our certified engineers develop optimal formwork plans tailored to your project''s specific requirements.","ru":"Группа GTC предлагает полный инженерный сервис — от простого структурного анализа до точных расчётов. Наши сертифицированные инженеры разработают оптимальный план опалубки с учётом специфики вашего проекта."}',
  'wrench',
  1
),
(
  'consulting',
  '{"ka":"კონსულტაცია და სწავლება","en":"Consulting & Training","ru":"Консультации и обучение"}',
  '{"ka":"საყალიბე სისტემების სწორი ექსპლუატაცია — ტრენინგები და საინჟინრო კონსულტაცია.","en":"Proper formwork system operation — training sessions and engineering consultation.","ru":"Правильная эксплуатация опалубочных систем — тренинги и инженерные консультации."}',
  '{"ka":"ჯითისი ჯგუფი საყალიბე სისტემების სწორი და ეფექტური ექსპლუატაციისათვის გთავაზობთ საინჟინრო გუნდის მომსახურებას. ჩვენი სპეციალისტები ჩაატარებენ ტრენინგებს თქვენს საიტზე და უზრუნველყოფენ უსაფრთხოებისა და ეფექტურობის სტანდარტების დაცვას.","en":"GTC Group provides engineering team services for proper and efficient formwork system operation. Our specialists conduct on-site training and ensure compliance with safety and efficiency standards.","ru":"Группа GTC предоставляет услуги инженерной команды для правильной и эффективной эксплуатации опалубочных систем. Наши специалисты проводят обучение на объекте и обеспечивают соблюдение стандартов безопасности и эффективности."}',
  'book-open',
  2
),
(
  'rental',
  '{"ka":"საყალიბე სისტემების იჯარა","en":"Formwork System Rental","ru":"Аренда опалубочных систем"}',
  '{"ka":"DOKA-ს ყველა სახეობის სისტემა საიჯარო მომსახურებით.","en":"All types of DOKA systems available for rental.","ru":"Все виды систем DOKA доступны в аренду."}',
  '{"ka":"ჯითისი ჯგუფი გთავაზობთ საყალიბე სისტემების საიჯარო მომსახურებას. ჩვენს სასაწყობე ბაზაზე ხელმისაწვდომია DOKA-ს ყველა სახეობის საყალიბე სისტემა. იჯარა საშუალებას გაძლევთ მნიშვნელოვნად შეამციროთ კაპიტალური ხარჯები მშენებლობის პროცესში.","en":"GTC Group offers formwork system rental services. Our warehouse facility stocks the full range of DOKA formwork systems. Renting allows you to significantly reduce capital expenditure during the construction process.","ru":"Группа GTC предлагает услуги аренды опалубочных систем. На нашей складской базе доступны все виды опалубочных систем DOKA. Аренда позволяет значительно сократить капитальные затраты в процессе строительства."}',
  'building',
  3
),
(
  'optimization',
  '{"ka":"პროცესების ოპტიმიზაცია","en":"Process Optimization","ru":"Оптимизация процессов"}',
  '{"ka":"ბეტონირების ციკლის დაჩქარება და ყალიბების ეფექტური დაგეგმარება.","en":"Accelerate concrete cycles and plan formwork efficiently.","ru":"Ускорение цикла бетонирования и эффективное планирование опалубки."}',
  '{"ka":"DOKA-ს სპეციალური ინსტრუმენტები მოგცემთ ბეტონირების ციკლის დაჩქარების, საქონლის მარაგების ოპტიმიზაციისა და ყალიბების ეფექტურად დაგეგმარების საშუალებას. გამოიყენეთ თანამედროვე ტექნოლოგიები მშენებლობის ვადებისა და ხარჯების ოპტიმიზაციისთვის.","en":"DOKA''s specialized tools enable acceleration of concrete cycles, optimization of inventory management, and efficient formwork planning. Leverage modern technologies to optimize construction timelines and costs.","ru":"Специализированные инструменты DOKA позволяют ускорить цикл бетонирования, оптимизировать управление запасами и эффективно планировать опалубку. Используйте современные технологии для оптимизации сроков и затрат строительства."}',
  'zap',
  4
);

-- ─── Seed: Product Categories ───────────────────────────────

INSERT INTO product_categories (slug, name, sort_order) VALUES
('wall-systems', '{"ka":"კედლის სისტემა","en":"Wall Systems","ru":"Стеновые системы"}', 1),
('slab-systems', '{"ka":"გადახურვის სისტემა","en":"Slab Systems","ru":"Системы перекрытий"}', 2),
('safety-systems', '{"ka":"უსაფრთხოების სისტემა","en":"Safety Systems","ru":"Системы безопасности"}', 3),
('scaffolding', '{"ka":"სივრცული ხარაჩო","en":"Scaffolding","ru":"Пространственные леса"}', 4),
('system-components', '{"ka":"სისტემის ელემენტები","en":"System Components","ru":"Элементы системы"}', 5),
('plywood', '{"ka":"სამშენებლო ფანერა","en":"Construction Plywood","ru":"Строительная фанера"}', 6),
('beams', '{"ka":"სამშენებლო კოჭი","en":"Construction Beams","ru":"Строительные балки"}', 7),
('props', '{"ka":"სამშენებლო დგარი","en":"Construction Props","ru":"Строительные стойки"}', 8),
('equipment', '{"ka":"დანადგარები","en":"Equipment","ru":"Оборудование"}', 9),
('accessories', '{"ka":"აქსესუარები","en":"Accessories","ru":"Аксессуары"}', 10);

-- ─── Seed: Brands ───────────────────────────────────────────

INSERT INTO brands (name, slug, is_partner, sort_order) VALUES
('DOKA', 'doka', true, 1),
('Sveza', 'sveza', true, 2),
('Plyterra', 'plyterra', true, 3),
('Alfix', 'alfix', true, 4),
('Gherardi', 'gherardi', true, 5),
('Extraform', 'extraform', true, 6);
