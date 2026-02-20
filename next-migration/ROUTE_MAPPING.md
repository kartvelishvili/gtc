# Route Mapping

## Frontend Routes

| Source Route (bolero-front) | Target Route (next-migration) | Status |
|----------------------------|------------------------------|--------|
| `/{lang}` | `/{lang}` | ✅ Migrated |
| `/{lang}/about-us` | `/{lang}/about-us` | ✅ Migrated |
| `/{lang}/about-us/{id}` | `/{lang}/about-us/{id}` | ✅ Migrated |
| `/{lang}/products` | `/{lang}/products` | ✅ Migrated |
| `/{lang}/products/{id}` | `/{lang}/products/{id}` | ✅ Migrated |
| `/{lang}/blogs` | `/{lang}/blogs` | ✅ Migrated |
| `/{lang}/blogs/{id}` | `/{lang}/blogs/{id}` | ✅ Migrated |
| `/{lang}/contact-us` | `/{lang}/contact-us` | ✅ Migrated |

### Locale Support
- Supported: `ge` (Georgian, default), `en` (English), `ru` (Russian)
- Middleware redirects `/` → `/ge`
- Dictionary files: `src/app/dictionaries/{ge,en,ru}.json`

---

## Admin Routes

| Source Route (bolero-admin) | Target Route (next-migration) | Status |
|----------------------------|------------------------------|--------|
| `/login` | `/admin/login` | ✅ Migrated |
| `/admin` | `/admin` | ✅ Migrated |
| `/admin/products` | `/admin/products` | ✅ Migrated |
| `/admin/products (create dialog)` | `/admin/products/new` | ✅ Migrated |
| `/admin/products (edit dialog)` | `/admin/products/{id}/edit` | ✅ Migrated |
| `/admin/product-categories` | `/admin/product-categories` | ✅ Migrated |
| `/admin/product-categories (create)` | `/admin/product-categories/new` | ✅ Migrated |
| `/admin/product-categories (edit)` | `/admin/product-categories/{id}/edit` | ✅ Migrated |
| `/admin/product-items` | `/admin/product-items` | ✅ Migrated |
| `/admin/product-items/create` | `/admin/product-items/new` | ✅ Migrated |
| `/admin/product-items/edit/:id` | `/admin/product-items/{id}/edit` | ✅ Migrated |
| `/admin/companies` | `/admin/companies` | ✅ Migrated |
| `/admin/companies (create)` | `/admin/companies/new` | ✅ Migrated |
| `/admin/companies (edit)` | `/admin/companies/{id}/edit` | ✅ Migrated |
| `/admin/blogs` | `/admin/blogs` | ✅ Migrated |
| `/admin/blogs (create)` | `/admin/blogs/new` | ✅ Migrated |
| `/admin/blogs (edit)` | `/admin/blogs/{id}/edit` | ✅ Migrated |
| `/admin/foods` | `/admin/foods` | ✅ Migrated |
| `/admin/foods (create)` | `/admin/foods/new` | ✅ Migrated |
| `/admin/foods (edit)` | `/admin/foods/{id}/edit` | ✅ Migrated |
| `/admin/management-team` | `/admin/management-team` | ✅ Migrated |
| `/admin/management-team (create)` | `/admin/management-team/new` | ✅ Migrated |
| `/admin/management-team (edit)` | `/admin/management-team/{id}/edit` | ✅ Migrated |
| `/admin/contact-us` | `/admin/contact-us` | ✅ Migrated |

### Key Changes
- Angular dialogs → Next.js dedicated pages (`/new`, `/{id}/edit`)
- Angular AuthGuard → Supabase Auth session check in layout
- Angular HttpClient → Supabase client + Server Actions
- Token in localStorage → Supabase session cookies

---

## API Endpoint Mapping

| NestJS Endpoint | Supabase Query Function | File |
|----------------|------------------------|------|
| `GET /products` | `getProducts()` | `queries.ts` |
| `GET /products/:id` | `getProduct(id)` | `queries.ts` |
| `GET /product-items` | `getProductItems(filters?)` | `queries.ts` |
| `GET /product-items/:id` | `getProductItem(id)` | `queries.ts` |
| `GET /product-items/random/:id` | `getRandomProductItems(excludeId)` | `queries.ts` |
| `GET /companies` | `getCompanies(filters?)` | `queries.ts` |
| `GET /blogs` | `getBlogs(filters?)` | `queries.ts` |
| `GET /blogs/:id` | `getBlog(id)` | `queries.ts` |
| `GET /management-team` | `getManagementTeam()` | `queries.ts` |
| `POST /contact-us` | `createContactUs(data)` | `queries.ts` |
| `POST /auth/login` | Supabase `auth.signInWithPassword()` | `admin.ts` |
| `POST /storage/upload-image` | Supabase Storage `upload()` | `admin.ts` |
| `POST/PUT/DELETE /products` | Server Actions | `admin.ts` |
| `POST/PUT/DELETE /product-category` | Server Actions | `admin.ts` |
| `POST/PUT/DELETE /product-items` | Server Actions | `admin.ts` |
| `POST/PUT/DELETE /companies` | Server Actions | `admin.ts` |
| `POST/PUT/DELETE /blogs` | Server Actions | `admin.ts` |
| `POST/PUT/DELETE /foods` | Server Actions | `admin.ts` |
| `POST/PUT/DELETE /management-team` | Server Actions | `admin.ts` |
