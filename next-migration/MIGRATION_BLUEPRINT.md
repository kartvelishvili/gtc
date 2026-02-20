# Migration Blueprint

## Project: Bolero & Co — Full-Stack Migration

### Source Stack
| Layer | Technology | Location |
|-------|-----------|----------|
| Frontend | Next.js 15.1.6, React 19, Tailwind 3.4, SCSS Modules | `bolero-front/` |
| Backend | NestJS 11, TypeORM, Passport/JWT | `bolero-back/` |
| Admin | Angular 19, Angular Material, ng-zorro-antd | `bolero-admin/` |
| Database | MySQL (DigitalOcean Managed) | remote |
| Cache | Valkey/Redis | remote |
| Storage | DigitalOcean Spaces (S3) | remote |

### Target Stack
| Layer | Technology | Location |
|-------|-----------|----------|
| Frontend + Admin | Next.js 15.1.6, React 19, Tailwind 3.4 | `next-migration/` |
| Backend | Supabase (PostgreSQL + Auth + Storage + RLS) | Supabase Cloud |
| Database | PostgreSQL via Supabase | Supabase Cloud |
| Cache | N/A (Supabase handles caching via CDN) | — |
| Storage | Supabase Storage | Supabase Cloud |

---

## Migration Phases

### Phase 1: Audit ✅
- Analyzed 106 frontend files, 113 backend files, 95 admin files
- Documented all entities, API endpoints, routes, and data flows
- Identified 35 backend API endpoints across 10 modules

### Phase 2: Setup ✅
- Created Next.js 15 project with identical config
- Configured Supabase client (browser + server)
- Copied all UI components, pages, styles, static assets
- Preserved i18n system (ge/en/ru dictionaries)
- Preserved 5 custom font families

### Phase 3: Supabase Integration ✅
- Created data layer (`src/lib/data/queries.ts`) replacing all API calls
- 9 files migrated from `get()` / `createApi()` to Supabase queries
- PostgreSQL schema created from TypeORM entities (14 tables)
- Row Level Security policies for all tables
- Seed data script with sample records

### Phase 4: Admin Panel ✅
- Angular 19 admin converted to Next.js App Router pages
- 8 entity CRUD pages (Products, Categories, Items, Companies, Blogs, Foods, Team, Contact)
- Supabase Auth integration (login/logout/session guard)
- Server Actions for all mutations
- File upload via Supabase Storage

### Phase 5: Deployment
- See DEPLOY_HOSTINGER.md for instructions

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Keep Next.js 15 | Frontend was already Next.js — minimize changes |
| Supabase over Firebase | PostgreSQL + RLS + built-in Auth + Storage |
| Server Actions over API Routes | Simpler, type-safe, no CORS issues |
| Soft deletes preserved | Match existing `deleted_at` pattern |
| JSONB for locale fields | PostgreSQL native JSON support > MySQL JSON |
| `as any` in admin queries | Supabase generic type inference too strict for dynamic selects |

---

## File Count Summary

| Category | Count |
|----------|-------|
| Frontend pages | 9 routes |
| Admin pages | 24 routes |
| Supabase queries | 11 query functions |
| Server actions | 22 action functions |
| SQL tables | 14 tables |
| Components | 12 shared components |
| Static assets | ~50 files (images, fonts, videos) |
