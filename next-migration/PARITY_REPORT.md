# Parity Report — Bolero & Co Migration

## Summary

| Area | Source Stack | Target Stack | Parity |
|------|-------------|-------------|--------|
| Frontend UI | Next.js 15 + React 19 | Next.js 15 + React 19 | ✅ 1:1 |
| Routing | App Router + [lang] | App Router + [lang] | ✅ 1:1 |
| Styling | Tailwind + SCSS Modules | Tailwind + SCSS Modules | ✅ 1:1 |
| Database | MySQL (DigitalOcean) | PostgreSQL (Supabase) | ✅ Equivalent |
| Backend API | NestJS 11 | Supabase Direct Queries | ✅ Functional parity |
| Auth | JWT + Passport | Supabase Auth | ✅ Functional parity |
| File Storage | DigitalOcean Spaces (S3) | Supabase Storage | ✅ Functional parity |
| Admin Panel | Angular 19 + Material | Next.js 15 + Tailwind | ✅ Functional parity |
| i18n | 3 locales (ge/en/ru) | 3 locales (ge/en/ru) | ✅ 1:1 |
| Caching | Valkey/Redis | None | ⚠️ Removed |

---

## Frontend — Full 1:1 Parity

### Pages Migrated (8 routes)

| Route | Status | Notes |
|-------|--------|-------|
| `/{lang}` (Home) | ✅ | Products, popular items, blogs, companies |
| `/{lang}/products` | ✅ | Product list with company filter |
| `/{lang}/products/[id]` | ✅ | Product detail + random similar items |
| `/{lang}/blogs` | ✅ | Blog list filtered by type |
| `/{lang}/blogs/[id]` | ✅ | Blog detail page |
| `/{lang}/about-us` | ✅ | Management team + about-us blogs |
| `/{lang}/about-us/[id]` | ✅ | About-us detail page |
| `/{lang}/contact-us` | ✅ | Contact form (layout only) |

### Components — Unchanged

All components were copied 1:1 from source:
- Header, Footer (with contact form)
- ProductCard, BlogCard, CompanyCard
- Swiper/Carousel components
- Video background
- Language switcher

### Static Assets — Unchanged

All fonts, images, icons, and videos copied from source `/public/`.

---

## Admin Panel — Functional Parity

### Original (Angular 19)

- Angular Material + ng-zorro-antd UI
- Dialog-based forms (MatDialog)
- Complex data tables with sorting/filtering
- Reactive forms with validation

### Migrated (Next.js 15)

- Tailwind CSS styling
- Page-based forms (separate /new and /[id]/edit routes)
- HTML tables with basic layout
- React Hook Form compatible (native HTML forms with server actions)

### Entity Coverage

| Entity | List | Create | Edit | Delete | Notes |
|--------|------|--------|------|--------|-------|
| Products | ✅ | ✅ | ✅ | ✅ | Locale fields (name, description) |
| Product Categories | ✅ | ✅ | ✅ | ✅ | Locale fields, product filter |
| Product Items | ✅ | ✅ | ✅ | ✅ | Complex form with all wine attributes |
| Companies | ✅ | ✅ | ✅ | ✅ | 3 image uploads (logo, big, banner) |
| Blogs | ✅ | ✅ | ✅ | ✅ | Locale fields, type select, gallery |
| Foods | ✅ | ✅ | ✅ | ✅ | Locale fields |
| Management Team | ✅ | ✅ | ✅ | ✅ | Image + locale fields |
| Contact Us | ✅ | – | – | – | Read-only list |

---

## Data Layer — Functional Parity

### Query Mapping

| Original (NestJS) | Migrated (Supabase) | Notes |
|---|---|---|
| `GET /product` | `getProducts()` | Supabase select with joins |
| `GET /product-item?filters` | `getProductItems(filters)` | .eq() filters |
| `GET /product-item/:id` | `getProductItem(id)` | Single row + joins |
| `GET /product-item/random/:id` | `getRandomProductItems(id)` | .neq() + .limit(10) |
| `GET /company?filters` | `getCompanies(filters)` | Optional product/id filter |
| `GET /blog?filters` | `getBlogs(filters)` | Type + visibility filter |
| `GET /blog/:id` | `getBlog(id)` | Single + gallery + file joins |
| `GET /management-team` | `getManagementTeam()` | Ordered by sort_order |
| `POST /contact-us` | `createContactUs(data)` | Server action |

### Data Transformations

- snake_case (Supabase) → camelCase (TypeScript): ✅ Handled by mapper functions
- Nested joins (product_item → product → categories → file): ✅ Supabase select syntax
- JSONB locale fields: ✅ Same `{en, ge, ru}` structure

---

## Database Schema — Full Parity

### 14 Tables Migrated

All tables from TypeORM entities recreated in PostgreSQL:
- `users`, `files`, `products`, `product_categories`, `product_items`
- `companies`, `blogs`, `foods`, `management_teams`, `contact_us`
- Join tables: `blog_files`, `food_items_product_items`, `product_items_awards`, `product_items_images`

### Custom Types

- `blog_type` enum: `about-us`, `normal`
- `glass_type` enum: `wine`, `burgundy`, `cordial`, `champagne`, `cognac`

### Row Level Security

- Public read on content tables (products, blogs, companies, etc.)
- Public insert on `contact_us` (contact form)
- Authenticated full access on all tables (admin)

---

## Known Differences

### 1. Caching (⚠️ Removed)

**Original:** Valkey/Redis cache layer for API responses
**Migrated:** No caching layer. Next.js ISR/SSG can be configured if needed.

**Impact:** Slightly higher database load. Supabase has built-in connection pooling via Supavisor.

**Mitigation:** Add `revalidate` to Next.js page exports for static regeneration:
```typescript
export const revalidate = 300; // 5 minutes
```

### 2. Admin UI Simplification

**Original:** Angular Material dialogs, data tables with sort/filter/pagination, complex form validation
**Migrated:** Simpler page-based forms, basic HTML tables, minimal validation

**Impact:** Admin UX is functional but less polished than the Angular version.

**Mitigation:** Can enhance incrementally with shadcn/ui or similar component library.

### 3. Image Upload UX

**Original:** Inline upload with preview and drag-drop
**Migrated:** Basic file input with Supabase Storage upload

**Impact:** Less visual feedback during upload.

### 4. Search/Filter in Admin Lists

**Original:** Full-text search, column sorting, pagination
**Migrated:** Basic list display ordered by creation date

**Impact:** Large datasets harder to navigate in admin.

### 5. Email Notifications

**Original:** Potentially configured via NestJS mailer for contact form
**Migrated:** Contact form saves to database only

**Impact:** Admin must check contact_us table manually.

**Mitigation:** Can add Supabase Edge Function or webhook for email alerts.

---

## Acceptance Criteria

- [x] All 8 frontend routes render identically to source
- [x] All static assets (fonts, images, videos) load correctly
- [x] 3-language support works (ge/en/ru)
- [x] Product listing and detail pages show correct data
- [x] Blog listing and detail pages show correct data
- [x] Company listing works with product filter
- [x] About Us page shows management team and about-us blogs
- [x] Contact form submits successfully to database
- [x] Admin login with email/password
- [x] Full CRUD for all 7 content entities
- [x] Image upload to Supabase Storage
- [x] Soft delete (deleted_at) for all entities
- [x] Database schema matches all source entity fields
- [x] RLS policies enforce proper access control
- [x] Project builds without TypeScript errors (34 routes)

---

## Data Migration Path

To migrate production data from MySQL to Supabase PostgreSQL:

1. Export MySQL data as CSV/JSON
2. Transform column names (camelCase → snake_case)
3. Upload files from DigitalOcean Spaces to Supabase Storage
4. Update file URLs in the `files` table
5. Import data into Supabase tables respecting FK order
6. Verify data integrity

See `SUPABASE_SETUP.md` for detailed migration steps.
