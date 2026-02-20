# Bolero & Co — Comprehensive Migration Audit Report
## Date: 2026-02-20

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Infrastructure & External Services](#2-infrastructure--external-services)
3. [bolero-front (Next.js Frontend)](#3-bolero-front-nextjs-frontend)
4. [bolero-back (NestJS Backend)](#4-bolero-back-nestjs-backend)
5. [bolero-admin (Angular Admin Panel)](#5-bolero-admin-angular-admin-panel)
6. [Data Models & Entity Relationships](#6-data-models--entity-relationships)
7. [Authentication Mechanism](#7-authentication-mechanism)
8. [i18n Setup](#8-i18n-setup)
9. [Styling Approach](#9-styling-approach)
10. [Known Issues & Migration Notes](#10-known-issues--migration-notes)

---

## 1. Project Overview

**Domain**: Bolero & Company — a Georgian wine/spirits production & export company website.

| Subproject | Framework | Version | Port |
|-----------|-----------|---------|------|
| bolero-front | Next.js (App Router) | 15.1.6 | 5001 |
| bolero-back | NestJS | 11.x | 5201 (default 3001) |
| bolero-admin | Angular | 19.x | 5100 |

**Node version used**: v24.13.1

---

## 2. Infrastructure & External Services

### Database: MySQL (DigitalOcean Managed)
- Host: `bolero-mysql-do-user-18981142-0.d.db.ondigitalocean.com:25060`
- Database: `defaultdb`
- SSL: Required
- ORM: TypeORM with `synchronize: true` (auto-migration)

### Cache: Valkey/Redis (DigitalOcean Managed)
- Host: `bolero-valkey-do-user-18981142-0.f.db.ondigitalocean.com:25061`
- TLS: Required
- Used via `@nestjs/cache-manager` + `@keyv/redis`
- Used for caching company+product queries

### Object Storage: DigitalOcean Spaces (S3-compatible)
- Bucket: `bolero-storage` (region: `fra1`)
- CDN URL: `https://bolero-storage.fra1.digitaloceanspaces.com/`
- Accessed via AWS SDK v2 (`aws-sdk`)

### Production Backend URL
- `https://oyster-app-sjunm.ondigitalocean.app` (fallback in frontend config)

### Social Media Links
- Instagram: `https://www.instagram.com/bolero_company`
- Facebook: `https://www.facebook.com/boleroandco`

---

## 3. bolero-front (Next.js Frontend)

### 3.1 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 15.1.6 | Framework (App Router, Turbopack dev) |
| react / react-dom | ^19.0.0 | UI library |
| next-intl | ^3.26.3 | i18n (installed but not actively used for routing) |
| @formatjs/intl-localematcher | ^0.5.10 | Locale matching |
| negotiator | ^1.0.0 | Content negotiation for locale |
| antd | ^5.23.3 | Ant Design UI components |
| swiper | ^11.2.2 | Carousel/slider components |
| react-hook-form | ^7.54.2 | Form handling (contact form) |
| react-image-gallery | ^1.4.0 | Image gallery |
| sass | ^1.83.4 | SCSS styling |
| dayjs | ^1.11.13 | Date formatting (blog dates) |
| tailwindcss | ^3.4.1 | Utility-first CSS |
| qs | ^6.14.0 | Query string serialization for API calls |

### 3.2 Configuration

**next.config.ts**:
- `output: 'standalone'` (Docker-friendly production builds)
- Remote image patterns: `bolero-storage.fra1.digitaloceanspaces.com`, `fra1.digitaloceanspaces.com`

**tailwind.config.ts**:
- Custom fonts: `dejavuSans`, `notoSansGeoSemi`, `inder`, `notoSansGeo`, `darkerGrotesque`
- Custom breakpoints: `sm: 768px`, `md: 1024px` (overrides defaults)
- CSS variable-based color scheme

**API Config** (`src/config/config.ts`):
- Base URL: `NEXT_PUBLIC_API_ROOT` env var → fallback `https://oyster-app-sjunm.ondigitalocean.app`

### 3.3 Middleware (`src/middleware.ts`)
- Locale-based routing: redirects unlocalized paths to `/{locale}/...`
- Supported locales: `en`, `ge`, `ru` (default: `ge`)
- Reads `cf-ipcountry` header (Cloudflare) and stores in a cookie named `test`
- Skips static assets (`_next/static`, images, videos, etc.)
- **Note**: `userPreferredLocale` is computed but NOT used — always defaults to `ge`

### 3.4 All Frontend Routes

| Route | Route Group | Page Component | Description |
|-------|-------------|----------------|-------------|
| `/{lang}/` | `(video)` | MainPage | Home page with video intro overlay |
| `/{lang}/about-us` | `(about-us)` | AboutUsPage | Management team, timeline, blogs |
| `/{lang}/about-us/{id}` | `(without-video)` | SingleBlogPage | Individual about-us blog detail |
| `/{lang}/products` | `(products)` | ProductsPage | Products grid filtered by company |
| `/{lang}/products/{id}` | `(without-video)` | SingleWinePage | Individual wine/product detail |
| `/{lang}/blogs` | `(without-video)` | BlogsPage | Blog listing (type: Normal) |
| `/{lang}/blogs/{id}` | `(without-video)` | SingleBlogPage | Individual blog detail with gallery |
| `/{lang}/contact-us` | `(without-video)` | ContactUsPage | Contact form + contact info |

### 3.5 Route Group Layouts

| Group | Layout Behavior |
|-------|----------------|
| `(video)` | Header + MainBanner (hero with product grid) |
| `(about-us)` | Header + AboutUsBanner |
| `(products)` | Header + ProductBanner |
| `(without-video)` | Header with dark background (`bg-[#191D22]`), no banner |

**Root Layout** (`[lang]/layout.tsx`):
- Loads custom fonts (DejaVu Sans local, Google Fonts: Darker Grotesque, Inder, Noto Sans Georgian)
- Wraps everything in `VideoOverlay` (one-time intro video per session)
- Renders `Footer` at bottom of every page

### 3.6 Components Inventory

| Component | Type | Purpose |
|-----------|------|---------|
| **Header** | Client | Navigation bar with logo, menu, language switcher, burger menu |
| **Footer** | Server (async) | Contact form, contact info, social links, copyright. Fetches products for footer nav. |
| **VideoOverlay** | Client | One-time intro video (`/bolero-last.mp4`), uses sessionStorage to track playback |
| **Menu / MenuItem** | Client | Navigation menu items |
| **BurgerMenu** | Client | Mobile hamburger menu |
| **LanguageSwitcher** | Client | Language selection dropdown |
| **ContentWrapper** | Shared | Layout wrapper with max-width constraints |
| **Input** | Shared | Reusable form input |
| **WineInfo** | Client | Swiper carousel of "About Us" blogs on home page |
| **PopularWines** | Client | Swiper carousel of popular wine items with details |
| **WineSlider** | Client | Coverflow-effect swiper of company brands |
| **TimeLine** | Client | Interactive Georgian wine history timeline (separate components per locale) |
| **GeorgianWine** | Shared | Static timeline component (hardcoded Georgian text) |
| **SommelierBlog** | Client | Blog carousel on about-us pages |
| **Slider** | Client | Generic slider component |
| **ProductsGrid** | Client | Home page product category grid |
| **Products** | Client | Products page with company filter grid |
| **BoleroWines** | Client | Single wine detail view with tasting notes |
| **ContactForm** | Client | React Hook Form contact form (POSTs to `contact-us` endpoint) |
| **ContactUs** | Shared | Footer contact section |
| **ContactList** | Shared | Contact info list items |
| **SocialLinks** | Shared | Social media icon links |
| **Copyright** | Shared | Copyright notice |
| **FooterContactInfo** | Shared | Footer contact details wrapper |
| **Gallery** | Client | Image gallery for blog detail pages |

### 3.7 API Client (`src/lib/api/`)

**Architecture**: Server-side fetching with Next.js `fetch()` + cache tags for revalidation.

| Function | File | Purpose |
|----------|------|---------|
| `get<T>()` | `get-function.ts` | Generic GET with query params, uses `next: { tags: [url] }` for caching |
| `createApi()` | `crud-operations.ts` | Generic POST, calls `revalidateTag()` |
| `updateApi()` | `crud-operations.ts` | Generic PUT by ID, calls `revalidateTag()` |
| `removeApi()` | `crud-operations.ts` | Generic DELETE by ID, calls `revalidateTag()` |
| `upsertApi()` | `crud-operations.ts` | POST or PUT based on ID presence |
| `baseFetch()` | `base/base-fetch.ts` | Core fetch wrapper, prepends `apiConfig.baseUrl`, sets `Content-Type: application/json` |
| `generateUrl()` | `base/base-fetch.ts` | URL builder with ID, subResource, query params (using `qs` library) |

**Type files**:
- `types/interfaces/get-data-arguments.interface.ts`
- `types/interfaces/generate-url-arguments.interface.ts`
- `types/interfaces/query-params.interface.ts`
- `types/interfaces/data.interface.ts`
- `types/interfaces/response.interface.ts`
- `types/base-fetch.type.ts`
- `types/create-api.type.ts`
- `types/update-api.type.ts`
- `types/upsert-api.type.ts`
- `types/generate-url.type.ts`

### 3.8 Frontend Interfaces (Data Models)

| Interface | Key Fields |
|-----------|------------|
| `IFile` | `id`, `url` |
| `IProduct` | `id`, `name: {en,ge,ru}`, `imageId`, `file: IFile`, `categories` |
| `IProductItem` | `id`, `name`, `image`, `description`, `alcohol`, `temperature`, `color`, `vinification`, `tannins`, `fruitTones`, `sweetness`, `body`, `glass: GlassType`, `productCategory`, `foods`, `isPopular`, `composition`, `aged`, `viticulture`, `volume`, `awards`, `images` |
| `IBlog` | `id`, `title`, `description`, `file`, `type: BlogTypeEnum`, `gallery`, `createdAt`, `visibleOnHome` |
| `ICompany` | `id`, `name`, `file`, `productItems`, `secondaryFile`, `activeFile` |
| `IFood` | `id`, `name`, `image` |
| `IManagementTeam` | `id`, `firstName`, `lastName`, `profession`, `image` |

---

## 4. bolero-back (NestJS Backend)

### 4.1 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @nestjs/core, common, platform-express | ^11.0.7 | NestJS framework |
| @nestjs/typeorm + typeorm | ^11.0.0 / ^0.3.20 | ORM (MySQL) |
| @nestjs/jwt | ^11.0.0 | JWT token signing/verification |
| @nestjs/passport + passport + passport-local | ^11.0.5 | Authentication strategies |
| @nestjs/swagger | ^11.0.3 | Swagger/OpenAPI documentation (at `/api`) |
| @nestjs/cache-manager + cache-manager + @keyv/redis | Various | Redis/Valkey caching |
| aws-sdk | ^2.1692.0 | S3-compatible storage (DO Spaces) |
| bcrypt | ^5.1.1 | Password hashing |
| mysql2 | ^3.12.0 | MySQL driver |
| class-validator + class-transformer | Various | DTO validation |
| ioredis | ^5.6.1 | Redis client |
| dotenv | ^16.4.7 | Environment variable loading |

### 4.2 Application Setup (`main.ts`)
- Swagger docs at `/api`
- Global `ValidationPipe` with `whitelist: true`
- CORS: `origin: '*'` (fully open)
- Default port: 3001 (overridable via `PORT` env)

### 4.3 Module Structure

| Module | Entities | Purpose |
|--------|----------|---------|
| AuthModule | — | Login, JWT auth, guards |
| UsersModule | User | User management (empty controller) |
| StorageModule | File | S3 file upload to DO Spaces |
| ProductsModule | Product | Wine product lines |
| ProductCategoryModule | ProductCategory | Categories within products |
| ProductItemsModule | ProductItem | Individual wine items (the main product entity) |
| CompainesModule | Company | Wine brand companies |
| BlogsModule | Blog | Blog posts (About Us + Normal) |
| ManagementTeamModule | ManagementTeam | Team member profiles |
| ContactUsModule | ContactUs | Contact form submissions |
| FoodsModule | Food | Food pairing items |

### 4.4 All API Endpoints

#### Auth (`/auth`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/login` | Public (LocalGuard) | Login with email/password, returns JWT token |

#### Products (`/products`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/products` | Public | Get all products |
| GET | `/products/:id` | Protected | Get product by ID |
| POST | `/products` | Protected | Create product |
| PUT | `/products/:id` | Protected | Update product |
| DELETE | `/products/:id` | Protected | Delete product |

#### Product Categories (`/product-category`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/product-category` | Protected | Get all categories (with query filter) |
| GET | `/product-category/:id` | Protected | Get category by ID |
| POST | `/product-category` | Protected | Create category |
| PUT | `/product-category/:id` | Protected | Update category |
| DELETE | `/product-category/:id` | Protected | Delete category |

#### Product Items (`/product-items`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/product-items` | Public | Get all items (with optional filters) |
| GET | `/product-items/random/:id` | Public | Get random items excluding specified ID |
| GET | `/product-items/admin` | Protected | Admin list with filters |
| GET | `/product-items/:id` | Public | Get item by ID |
| POST | `/product-items` | Protected | Create item |
| PUT | `/product-items/:id` | Protected | Update item |
| DELETE | `/product-items/:id` | Protected | Delete item |

#### Companies (`/companies`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/companies` | Public | Get all with product items (cached) |
| GET | `/companies/admin` | Protected | Admin list |
| GET | `/companies/:id` | Protected | Get by ID |
| POST | `/companies` | Protected | Create company |
| PUT | `/companies/:id` | Protected | Update company |
| DELETE | `/companies/:id` | Protected | Delete company |

#### Blogs (`/blogs`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/blogs` | Public | Get all (filtered by type, visibleOnHome) |
| GET | `/blogs/admin` | Protected | Admin list |
| GET | `/blogs/:id` | Public | Get blog by ID |
| POST | `/blogs` | Protected | Create blog |
| PUT | `/blogs/:id` | Protected | Update blog |
| DELETE | `/blogs/:id` | Protected | Delete blog |

#### Management Team (`/management-team`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/management-team` | Public | Get all members |
| GET | `/management-team/admin` | Protected | Admin list |
| GET | `/management-team/:id` | Protected | Get member by ID |
| POST | `/management-team` | Protected | Create member |
| PUT | `/management-team/:id` | Protected | Update member |
| DELETE | `/management-team/:id` | Protected | Delete member |

#### Contact Us (`/contact-us`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/contact-us` | Public | Submit contact form |
| GET | `/contact-us` | Protected | List all submissions |

#### Foods (`/foods`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/foods` | Protected | Get all foods |
| GET | `/foods/:id` | Protected | Get food by ID |
| POST | `/foods` | Protected | Create food |
| PUT | `/foods/:id` | Protected | Update food |
| DELETE | `/foods/:id` | Protected | Delete food |

#### Storage (`/storage`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/storage/upload-image` | Protected | Upload files (multipart, field: `files`) |

#### Users (`/users`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| — | — | — | Empty controller (no endpoints) |

### 4.5 Backend Architecture Pattern
Each module follows: **Controller → Service → Repository → Entity**
- **Entities**: TypeORM decorators mapping to MySQL tables
- **Mappers**: Separate mapper classes (`Entity ↔ Model`) for separation between DB entities and API response models
- **DTOs**: class-validator decorated DTOs for input validation
- **Repositories**: Direct TypeORM query builder / find operations
- Soft delete enabled via `@DeleteDateColumn()` in `BaseEntity`

---

## 5. bolero-admin (Angular Admin Panel)

### 5.1 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @angular/core + related | ^19.0.0 | Angular framework |
| @angular/material + @angular/cdk | ^19.1.2 | Material Design UI |
| ng-zorro-antd | ^19.0.2 | Ant Design for Angular |
| flowbite | ^3.1.1 | Tailwind-based component library |
| notiflix | ^3.2.8 | Toast notifications |
| tailwindcss | ^3.4.17 | Utility CSS |

### 5.2 Admin Routes

| Path | Component | Auth Required |
|------|-----------|---------------|
| `/login` | LoginComponent | No |
| `/admin` | AdminComponent (wrapper) | Yes (AuthGuard) |
| `/admin/blogs` | BlogsComponent | Yes |
| `/admin/contact-us` | ContactUsComponent | Yes |
| `/admin/management-team` | ManagementTeamComponent | Yes |
| `/admin/products` | ProductsComponent | Yes |
| `/admin/product-categories` | ProductCategoriesComponent | Yes |
| `/admin/product-items` | ProductItemsComponent | Yes |
| `/admin/product-items/create` | CreateProductItemComponent | Yes |
| `/admin/product-items/edit/:id` | UpdateProductItemComponent | Yes |
| `/admin/companies` | CompaniesComponent | Yes |
| `/admin/foods` | FoodsComponent | Yes |
| `**` (wildcard) | Redirects to `/admin` | — |

### 5.3 Admin Services
- `AuthService` — login via `/auth/login`, stores user in `localStorage`
- `BlogsService`, `CompaniesService`, `ContactUsService`, `FoodsService`, `ManagementTeamService`, `ProductCategoriesService`, `ProductItemsService`, `ProductsService`, `StorageService`, `UserService`
- All services use `environement.apiUrl` (`http://localhost:5201`) as base

### 5.4 Admin Auth Flow
1. Login → POST `/auth/login` → receives `{ token, id, email, userName }`
2. Token stored in `localStorage` as `user` JSON
3. `HttpTokenInterceptor` reads token from localStorage, attaches `Authorization: Bearer {token}` header
4. `AuthGuard` checks `localStorage.getItem('user')` — redirects to `/login` if null
5. On 401 response → interceptor navigates to `/auth/login`

### 5.5 Dialog Components (CRUD Forms)
- `BlogDialogComponent` — Create/edit blogs with cover photo + gallery upload
- `CompanyDialogComponent` — Create/edit companies with logo uploads
- `FoodDialogComponent` — Create/edit food pairings
- `ImageDialogComponent` — Generic image viewer
- `ManagementTeamDialogComponent` — Create/edit team members
- `ProductCategoryDialogComponent` — Create/edit product categories
- `ProductDialogComponent` — Create/edit products
- `ProductItemFormComponent` — Shared form for product items (create/update)

---

## 6. Data Models & Entity Relationships

### Entity Relationship Diagram (Simplified)

```
User
  ├── id, userName, email, password

File
  ├── id, url, userId → User

Product
  ├── id, name:{en,ge,ru}, imageId → File
  └── categories[] → ProductCategory

ProductCategory
  ├── id, name:{en,ge,ru}, productId → Product
  └── items[] → ProductItem

ProductItem (Main product entity)
  ├── id, name:{en,ge,ru}, description:{en,ge,ru}
  ├── imageId → File (main image)
  ├── alcohol, temperature, color:{en,ge,ru}
  ├── fruitTones, tannins, sweetness, body (tasting scores)
  ├── glass: enum(wine,burgundy,cordial,champagne,cognac)
  ├── vinificationId → File (PDF)
  ├── productCategoryId → ProductCategory
  ├── companyId → Company
  ├── isPopular: boolean
  ├── composition, viticulture, aged, volume (all {en,ge,ru} JSON)
  ├── awards[] → File (many-to-many via product_items_awards)
  ├── images[] → File (many-to-many via product_items_images)
  └── foods[] → Food (many-to-many)

Company
  ├── id, name (string, NOT localized)
  ├── fileId → File (main logo)
  ├── secondaryFileId → File (secondary logo)
  ├── activeFileId → File (active state logo)
  └── productItems[] → ProductItem

Blog
  ├── id, title:{en,ge,ru}, description:{en,ge,ru}
  ├── fileId → File (cover image)
  ├── type: enum(about-us, normal)
  ├── visibleOnHome: boolean
  └── gallery[] → File (many-to-many via blog_files)

ManagementTeam
  ├── id, firstName:{en,ge,ru}, lastName:{en,ge,ru}
  ├── profession:{en,ge,ru}
  └── imageId → File

ContactUs
  ├── id, firstName, lastName, phoneNumber, email, text

Food
  ├── id, name:{en,ge,ru}, imageId → File
  └── items[] → ProductItem (many-to-many)
```

### Base Entity (all entities inherit)
- `id` (auto-increment PK)
- `createdAt`, `updatedAt` (auto-managed)
- `deletedAt` (soft delete)

### Key Enums
- `BlogTypeEnum`: `about-us`, `normal`
- `GlassType`: `wine`, `burgundy`, `cordial`, `champagne`, `cognac`

---

## 7. Authentication Mechanism

### Backend Auth
- **Strategy**: Passport.js `local` strategy (email + password)
- **Password storage**: bcrypt hashed
- **Token**: JWT signed with `JWT_SECRET` env variable
- **Global guard**: `AuthGuard` applied to all routes by default
- **Public routes**: Decorated with `@Public()` custom decorator (sets `IS_PUBLIC_KEY` metadata)
- **Token format**: Bearer token in `Authorization` header

### Public Endpoints (no auth required)
- `POST /auth/login`
- `GET /products`
- `GET /product-items` (list + by ID + random)
- `GET /companies` (public listing)
- `GET /blogs` (list + by ID)
- `GET /management-team` (list)
- `POST /contact-us`

### Protected Endpoints
- All CRUD operations (create, update, delete)
- Admin listing endpoints (`/admin` sub-paths)
- File uploads (`/storage/upload-image`)
- Contact us listing (`GET /contact-us`)
- All food, product-category, and user endpoints

### Frontend Auth
- **No frontend auth** — the public-facing site only calls public endpoints
- Admin panel handles auth via localStorage token

---

## 8. i18n Setup

### Supported Locales
| Code | Language |
|------|----------|
| `ge` | Georgian (ქართული) — **default** |
| `en` | English |
| `ru` | Russian |

### Implementation
1. **URL-based routing**: `/{lang}/...` — locale is first path segment
2. **Middleware**: Redirects bare paths to `/{defaultLocale}/...` (always `ge`)
3. **Dictionary files**: Static JSON at `src/app/dictionaries/{ge,en,ru}.json`
4. **Dictionary loader**: `getDictionary(locale)` — dynamic import with `server-only`
5. **Content localization**: All database content stored as `{en, ge, ru}` JSON columns — resolved at render time using `data.field[locale]`
6. **Date localization**: dayjs with `ka` (Georgian), `en`, `ru` locales

### Dictionary Content (~45 keys each)
- Navigation labels (About Us, Blogs, Products, Contact)
- Wine attributes (Color, Temperature, Alcohol, Type)
- Tasting terms (Fruity Notes, Tannins, Sweetness, Body)
- Form labels (Name, Surname, Mobile Number, Email)
- Section headings (Company News, Popular Wines, History of Georgian Wine)
- Long-form management team description
- Footer text and copyright

### Note on next-intl
- `next-intl` is installed but the app uses a **custom dictionary approach** (`getDictionary()`) rather than `next-intl`'s `useTranslations`/`useMessages` pattern
- `NextIntlClientProvider` imported in layout but not actively wrapping content

---

## 9. Styling Approach

### Technologies
| Tool | Usage |
|------|-------|
| **Tailwind CSS 3.4** | Primary styling — extensive inline utility classes |
| **SCSS Modules** | Component-specific styles (`.module.scss` files) |
| **Global SCSS** | `globals.scss` — Swiper pagination, scrollbar, line-clamp utilities |
| **CSS Variables** | `--background`, `--foreground`, font variables |

### SCSS Module Files
- `GeorgianWine.module.scss`
- `PopularWines.module.scss`
- `SommelierBlog.module.scss`
- `WineInfo.module.scss`
- `WineSlider.module.scss`

### Design System
- **Dark theme**: Background `#0D1116`, surface `#171B1F`/`#191D22`
- **Accent gold**: `#D2AE6D`, `#BBAA58`
- **Text**: White primary, `#8D8D8D` secondary
- **Border styling**: Gradient borders via `border-image-source`
- **Rounded corners**: `rounded-[48px]` on cards, `rounded-3xl` on smaller elements
- **Custom fonts**: 5 font families loaded (DejaVu Sans, Noto Sans Georgian variants, Inder, Darker Grotesque)

### Breakpoints
| Name | Size | Note |
|------|------|------|
| default | < 768px | Mobile |
| sm | ≥ 768px | Tablet |
| md | ≥ 1024px | Desktop |

---

## 10. Known Issues & Migration Notes

### Architecture Notes
1. **TypeORM `synchronize: true`** in production — risky for data integrity during schema changes
2. **CORS fully open** (`origin: '*'`) — should be restricted in production
3. **No rate limiting** on public endpoints or file uploads
4. **No email/notification service** for contact form submissions — just stored in DB
5. **Swagger docs** exposed at `/api` without authentication
6. **Company name is NOT localized** (plain string, unlike all other entities)
7. **`@Public()` decorator inconsistency**: `GET /products/:id` is NOT public (but list is). `GET /foods` is not public either.

### Frontend Notes
1. **Video overlay**: Full-screen intro video plays once per session (`sessionStorage` flag) — blocks entire page until finished
2. **Middleware locale detection**: Reads `accept-language` header but IGNORES it — always defaults to `ge`
3. **`cf-ipcountry` cookie**: Stored as `test` — used to filter companies by country; fragile naming
4. **TimeLine component**: Has 6 hardcoded sub-components (Desktop/Mobile × 3 locales) — not dynamic
5. **`JSON.parse(JSON.stringify(dictionary))`**: Used extensively to pass server data to client components — serialization overhead
6. **15+ components** have `src=""` guards added to prevent broken images (from URL recovery issue)
7. **No error boundaries** or loading states on pages
8. **No SEO metadata** beyond basic title "Bolero & Co"

### Backend Notes
1. **Empty `/users` controller** — no user management endpoints
2. **File entity lacks metadata** — no `size`, `originalName`, `mimeType` columns
3. **Storage service uses AWS SDK v2** (deprecated) — should migrate to v3
4. **URL recovery**: 367 out of 1,664 files still have empty/broken URLs (see archive for details)
5. **Cache clearing**: All write operations call `cacheManager.clear()` (clears ALL cache, not targeted)

### Admin Notes
1. **Environment hardcoded to localhost** — no production environment config
2. **Token stored in localStorage** — XSS-vulnerable
3. **No refresh token mechanism** — JWT expiration management unclear
4. **Duplicate `provideAnimationsAsync()` and `provideNzI18n(en_US)`** in app.config.ts

### Data Migration Considerations
1. All translatable content uses `{en, ge, ru}` JSON columns — need to handle this structure in target system
2. Many-to-many relationships use junction tables: `blog_files`, `product_items_awards`, `product_items_images`, `food_items`
3. File references are central — nearly every entity references the `file` table
4. Soft deletes (`deleted_at`) — decide whether to migrate soft-deleted records
5. The `bolero_archive/` contains a full MySQL dump (774 KB), all 1,424 Spaces files (1 GB), and Valkey cache dump (3.7 MB)

---

## Appendix A: Complete File Structure Summary

### bolero-front/src/ (~73 files)
```
src/
├── middleware.ts
├── config/
│   ├── config.ts
│   └── interfaces/api-config.interface.ts
├── app/
│   ├── globals.scss
│   ├── dictionaries/
│   │   ├── dictionaries.ts
│   │   ├── en.json, ge.json, ru.json
│   ├── [lang]/
│   │   ├── layout.tsx (root)
│   │   ├── (video)/
│   │   │   ├── layout.tsx, page.tsx
│   │   │   └── components/ (MainBanner, ProductsGrid)
│   │   ├── (about-us)/
│   │   │   ├── layout.tsx
│   │   │   ├── about-us/page.tsx
│   │   │   └── components/ (ManagementTeam, Description, Blogs, AboutUsBanner)
│   │   ├── (products)/
│   │   │   ├── layout.tsx
│   │   │   ├── products/page.tsx
│   │   │   └── components/ (Products, BoleroWines, ProductBanner)
│   │   └── (without-video)/
│   │       ├── layout.tsx
│   │       ├── about-us/[id]/page.tsx
│   │       ├── blogs/page.tsx, blogs/[id]/page.tsx
│   │       ├── contact-us/page.tsx
│   │       └── products/[id]/page.tsx
├── components/
│   ├── Header/, Footer/, ContentWrapper/, Input/
│   ├── VideoOverlay/, WineSlider/, WineInfo/
│   ├── PopularWines/, TimeLine/, GeorgianWine/
│   ├── SommelierBlog/, Slider/
├── interfaces/ (7 files)
├── enums/ (blog-type.enum.ts, glass-type.enum.ts)
├── types/ (locale.type.ts)
└── lib/api/ (base/, types/, get-function.ts, crud-operations.ts)
```

### bolero-back/src/ (~85 files)
```
src/
├── main.ts, app.module.ts, app.controller.ts, app.service.ts
├── config/ (config.ts, interfaces/)
├── utils/ (base.entity.ts, base.model.ts, glass-type.enum.ts)
└── modules/
    ├── auth/ (controller, service, module, guards/, strategies/, decorators/)
    ├── users/ (controller, service, module, entity, model, mapper, repository)
    ├── storage/ (controller, service, module, entity, model, mapper, repository)
    ├── products/ (controller, service, module, entity, model, mapper, repository, dtos/)
    ├── product-category/ (same pattern)
    ├── product-items/ (same pattern)
    ├── compaines/ (same pattern) [note: typo in folder name]
    ├── blogs/ (same pattern + enums/)
    ├── management-team/ (same pattern)
    ├── contact-us/ (same pattern)
    └── foods/ (same pattern)
```

### bolero-admin/src/ (~75 files)
```
src/
├── main.ts, index.html, styles.css
├── environements/environement.ts
└── app/
    ├── app.component.*, app.config.ts, app.routes.ts
    ├── guards/auth.guard.ts
    ├── interceptors/http.interceptor.ts
    ├── enums/glass-type.enum.ts
    ├── interfaces/ (12 files)
    ├── services/ (11 files)
    ├── components/
    │   ├── login/
    │   ├── admin/ (wrapper + 9 section components)
    │   └── dialogs/ (8 dialog components for CRUD forms)
```
