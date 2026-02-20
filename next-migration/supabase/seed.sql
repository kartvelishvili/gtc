-- ============================================================
-- Bolero & Co — Seed Data
-- Provides sample data for development and testing
-- ============================================================

-- ─── Admin User ─────────────────────────────────────────────
-- Note: Use Supabase Auth for the actual admin user.
-- This is a reference record in the users table.

INSERT INTO users (user_name, email, password) VALUES
  ('admin', 'admin@bolero.ge', '$2b$10$placeholder_hash_replace_with_real');

-- ─── Files (sample URLs — replace with Supabase Storage URLs) ──

INSERT INTO files (url, user_id) VALUES
  ('https://placeholder.co/600x400?text=Product+1', 1),        -- 1
  ('https://placeholder.co/600x400?text=Product+2', 1),        -- 2
  ('https://placeholder.co/600x400?text=Product+3', 1),        -- 3
  ('https://placeholder.co/600x400?text=Company+1', 1),        -- 4
  ('https://placeholder.co/600x400?text=Company+2', 1),        -- 5
  ('https://placeholder.co/200x400?text=Company+1+Secondary', 1), -- 6
  ('https://placeholder.co/200x400?text=Company+2+Secondary', 1), -- 7
  ('https://placeholder.co/200x400?text=Company+1+Active', 1),    -- 8
  ('https://placeholder.co/200x400?text=Company+2+Active', 1),    -- 9
  ('https://placeholder.co/600x800?text=Wine+1', 1),           -- 10
  ('https://placeholder.co/600x800?text=Wine+2', 1),           -- 11
  ('https://placeholder.co/600x800?text=Wine+3', 1),           -- 12
  ('https://placeholder.co/600x800?text=Wine+4', 1),           -- 13
  ('https://placeholder.co/600x400?text=Vinification+1', 1),   -- 14
  ('https://placeholder.co/600x400?text=Vinification+2', 1),   -- 15
  ('https://placeholder.co/600x400?text=Blog+1', 1),           -- 16
  ('https://placeholder.co/600x400?text=Blog+2', 1),           -- 17
  ('https://placeholder.co/600x400?text=Blog+3', 1),           -- 18
  ('https://placeholder.co/600x400?text=Gallery+1', 1),        -- 19
  ('https://placeholder.co/600x400?text=Gallery+2', 1),        -- 20
  ('https://placeholder.co/400x400?text=Food+1', 1),           -- 21
  ('https://placeholder.co/400x400?text=Food+2', 1),           -- 22
  ('https://placeholder.co/400x400?text=Food+3', 1),           -- 23
  ('https://placeholder.co/400x400?text=Team+1', 1),           -- 24
  ('https://placeholder.co/400x400?text=Team+2', 1),           -- 25
  ('https://placeholder.co/400x400?text=Team+3', 1),           -- 26
  ('https://placeholder.co/400x400?text=Award+1', 1),          -- 27
  ('https://placeholder.co/400x400?text=Award+2', 1),          -- 28
  ('https://placeholder.co/600x800?text=Wine+Extra+1', 1),     -- 29
  ('https://placeholder.co/600x800?text=Wine+Extra+2', 1);     -- 30

-- ─── Products ───────────────────────────────────────────────

INSERT INTO products (name, image_id) VALUES
  ('{"en":"Wine","ge":"ღვინო","ru":"Вино"}', 1),
  ('{"en":"Chacha","ge":"ჭაჭა","ru":"Чача"}', 2),
  ('{"en":"Brandy","ge":"ბრენდი","ru":"Бренди"}', 3);

-- ─── Product Categories ────────────────────────────────────

INSERT INTO product_categories (name, product_id) VALUES
  ('{"en":"Red Wine","ge":"წითელი ღვინო","ru":"Красное вино"}', 1),
  ('{"en":"White Wine","ge":"თეთრი ღვინო","ru":"Белое вино"}', 1),
  ('{"en":"Rosé","ge":"ვარდისფერი","ru":"Розовое"}', 1),
  ('{"en":"Classic Chacha","ge":"კლასიკური ჭაჭა","ru":"Классическая чача"}', 2),
  ('{"en":"Aged Brandy","ge":"დაძველებული ბრენდი","ru":"Выдержанный бренди"}', 3);

-- ─── Companies ──────────────────────────────────────────────

INSERT INTO companies (name, file_id, secondary_file_id, active_file_id) VALUES
  ('Bolero Winery', 4, 6, 8),
  ('Kakheti Cellars', 5, 7, 9);

-- ─── Foods ──────────────────────────────────────────────────

INSERT INTO foods (name, image_id) VALUES
  ('{"en":"Cheese","ge":"ყველი","ru":"Сыр"}', 21),
  ('{"en":"Meat","ge":"ხორცი","ru":"Мясо"}', 22),
  ('{"en":"Fish","ge":"თევზი","ru":"Рыба"}', 23);

-- ─── Product Items ──────────────────────────────────────────

INSERT INTO product_items (
  name, image_id, description, alcohol, temperature, color,
  vinification_id, fruit_tones, tannins, sweetness, body, glass,
  product_category_id, company_id, is_popular, composition, viticulture, aged, volume
) VALUES
  (
    '{"en":"Saperavi Reserve","ge":"საფერავი რეზერვი","ru":"Саперави Резерв"}',
    10,
    '{"en":"A rich, full-bodied red wine with dark fruit notes.","ge":"მდიდარი, სხეულიანი წითელი ღვინო მუქი ხილის ტონებით.","ru":"Богатое, полнотелое красное вино с нотами тёмных фруктов."}',
    13.5, '16-18°C',
    '{"en":"Deep ruby","ge":"ღრმა ლალისფერი","ru":"Глубокий рубиновый"}',
    14, 80, 75, 20, 85, 'wine',
    1, 1, true,
    '{"en":"100% Saperavi","ge":"100% საფერავი","ru":"100% Саперави"}',
    '{"en":"Traditional Georgian","ge":"ტრადიციული ქართული","ru":"Традиционное грузинское"}',
    '{"en":"12 months in oak barrels","ge":"12 თვე მუხის კასრებში","ru":"12 месяцев в дубовых бочках"}',
    '{"en":"0.75L","ge":"0.75ლ","ru":"0,75л"}'
  ),
  (
    '{"en":"Rkatsiteli Classic","ge":"რქაწითელი კლასიკური","ru":"Ркацители Классик"}',
    11,
    '{"en":"A crisp, aromatic white wine with citrus and green apple notes.","ge":"მყარი, არომატული თეთრი ღვინო ციტრუსისა და მწვანე ვაშლის ტონებით.","ru":"Свежее ароматное белое вино с нотами цитрусовых и зелёного яблока."}',
    12.0, '8-10°C',
    '{"en":"Pale gold","ge":"ფერმკრთალი ოქროსფერი","ru":"Бледно-золотистый"}',
    15, 60, 30, 35, 50, 'wine',
    2, 1, true,
    '{"en":"100% Rkatsiteli","ge":"100% რქაწითელი","ru":"100% Ркацители"}',
    '{"en":"Kakheti region vineyards","ge":"კახეთის რეგიონის ვენახები","ru":"Виноградники региона Кахети"}',
    '{"en":"6 months in stainless steel","ge":"6 თვე უჟანგავ ფოლადში","ru":"6 месяцев в нержавеющей стали"}',
    '{"en":"0.75L","ge":"0.75ლ","ru":"0,75л"}'
  ),
  (
    '{"en":"Rosé Delight","ge":"ვარდისფერი სიამოვნება","ru":"Розовое наслаждение"}',
    12,
    '{"en":"A light and refreshing rosé with strawberry aromas.","ge":"მსუბუქი და გამაგრილებელი ვარდისფერი მარწყვის არომატით.","ru":"Лёгкое и освежающее розовое с ароматом клубники."}',
    11.5, '10-12°C',
    '{"en":"Salmon pink","ge":"ორაგულისფერი ვარდისფერი","ru":"Лососево-розовый"}',
    14, 70, 20, 45, 40, 'wine',
    3, 2, false,
    '{"en":"Saperavi blend","ge":"საფერავის ნაზავი","ru":"Купаж Саперави"}',
    NULL, NULL,
    '{"en":"0.75L","ge":"0.75ლ","ru":"0,75л"}'
  ),
  (
    '{"en":"Premium Chacha","ge":"პრემიუმ ჭაჭა","ru":"Премиум Чача"}',
    13,
    '{"en":"A smooth grape spirit with a velvety finish.","ge":"რბილი ყურძნის სპირტი ხავერდოვანი დასასრულით.","ru":"Мягкий виноградный спирт с бархатистым послевкусием."}',
    45.0, '18-20°C',
    '{"en":"Crystal clear","ge":"კრისტალურად გამჭვირვალე","ru":"Кристально прозрачный"}',
    15, 50, 10, 15, 90, 'cognac',
    4, 2, true,
    '{"en":"Grape pomace","ge":"ყურძნის ჭაჭა","ru":"Виноградные выжимки"}',
    NULL, NULL,
    '{"en":"0.5L","ge":"0.5ლ","ru":"0,5л"}'
  );

-- ─── Blogs ──────────────────────────────────────────────────

INSERT INTO blogs (title, description, file_id, type, visible_on_home) VALUES
  (
    '{"en":"The Art of Georgian Winemaking","ge":"ქართული მეღვინეობის ხელოვნება","ru":"Искусство грузинского виноделия"}',
    '{"en":"Explore the ancient traditions of Georgian winemaking that date back 8,000 years.","ge":"გაეცანით ქართული მეღვინეობის უძველეს ტრადიციებს, რომლებსაც 8000 წლის ისტორია აქვს.","ru":"Познакомьтесь с древними традициями грузинского виноделия, насчитывающими 8000 лет."}',
    16, 'about-us', true
  ),
  (
    '{"en":"Harvest Season 2024","ge":"რთველი 2024","ru":"Сезон сбора урожая 2024"}',
    '{"en":"A look at this year''s exceptional grape harvest and what it means for our wines.","ge":"ამ წლის განსაკუთრებული რთველის მიმოხილვა და რას ნიშნავს ეს ჩვენი ღვინოებისთვის.","ru":"Обзор исключительного урожая этого года и что это значит для наших вин."}',
    17, 'normal', false
  ),
  (
    '{"en":"Our Story","ge":"ჩვენი ისტორია","ru":"Наша история"}',
    '{"en":"The founding story of Bolero & Co and our commitment to quality.","ge":"Bolero & Co-ს დაარსების ისტორია და ჩვენი ვალდებულება ხარისხის მიმართ.","ru":"История основания Bolero & Co и наша приверженность качеству."}',
    18, 'about-us', true
  );

-- ─── Blog Gallery ───────────────────────────────────────────

INSERT INTO blog_files (blog_id, file_id) VALUES
  (1, 19), (1, 20),
  (3, 19), (3, 20);

-- ─── Management Team ────────────────────────────────────────

INSERT INTO management_teams (first_name, last_name, image_id, profession) VALUES
  (
    '{"en":"Giorgi","ge":"გიორგი","ru":"Георгий"}',
    '{"en":"Maisuradze","ge":"მაისურაძე","ru":"Маисурадзе"}',
    24,
    '{"en":"CEO & Founder","ge":"აღმასრულებელი დირექტორი და დამფუძნებელი","ru":"Генеральный директор и основатель"}'
  ),
  (
    '{"en":"Nino","ge":"ნინო","ru":"Нино"}',
    '{"en":"Kapanadze","ge":"კაპანაძე","ru":"Капанадзе"}',
    25,
    '{"en":"Head Winemaker","ge":"მთავარი მეღვინე","ru":"Главный винодел"}'
  ),
  (
    '{"en":"Davit","ge":"დავით","ru":"Давид"}',
    '{"en":"Lomidze","ge":"ლომიძე","ru":"Ломидзе"}',
    26,
    '{"en":"Marketing Director","ge":"მარკეტინგის დირექტორი","ru":"Директор по маркетингу"}'
  );

-- ─── Product Items Awards ───────────────────────────────────

INSERT INTO product_items_awards (product_item_id, file_id) VALUES
  (1, 27), (1, 28),
  (2, 27);

-- ─── Product Items Images ───────────────────────────────────

INSERT INTO product_items_images (product_item_id, file_id) VALUES
  (1, 29), (1, 30),
  (2, 29);

-- ─── Food Pairings ──────────────────────────────────────────

INSERT INTO food_items_product_items (food_id, product_item_id) VALUES
  (1, 1), (2, 1),   -- Saperavi: Cheese + Meat
  (1, 2), (3, 2),   -- Rkatsiteli: Cheese + Fish
  (3, 3),            -- Rosé: Fish
  (2, 4);            -- Chacha: Meat

-- ─── Sample Contact Us Entry ────────────────────────────────

INSERT INTO contact_us (first_name, last_name, phone_number, email, text) VALUES
  ('Test', 'User', '+995555123456', 'test@example.com', 'This is a test message for development purposes.');
