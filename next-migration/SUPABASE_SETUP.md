# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your credentials:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon Key**: (public, safe for browser)
   - **Service Role Key**: (private, server-only)

## 2. Configure Environment Variables

Copy `.env.local.example` or create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 3. Run Database Schema

1. Go to Supabase Dashboard → **SQL Editor**
2. Open `supabase/migrations/001_schema.sql`
3. Run the entire script — this creates:
   - 10 main tables (users, files, products, product_categories, product_items, companies, blogs, foods, management_teams, contact_us)
   - 4 join tables (blog_files, food_items_product_items, product_items_awards, product_items_images)
   - 2 custom types (blog_type, glass_type)
   - Indexes for performance
   - RLS policies (public read, auth write)
   - Updated_at triggers

## 4. Create Storage Bucket

In the SQL Editor, run:

```sql
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Auth upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Auth update media" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Auth delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
```

## 5. Create Admin User

In Supabase Dashboard → **Authentication** → **Users** → **Add User**:

- Email: `admin@bolero.ge` (or your admin email)
- Password: (strong password)
- Check "Auto Confirm User"

## 6. Seed Data (Optional)

For development/testing:

1. Go to SQL Editor
2. Open `supabase/seed.sql`
3. Run the script

This creates sample data: 3 products, 5 categories, 4 product items, 2 companies, 3 blogs, 3 foods, 3 management team members.

## 7. Migrate Existing Data

To migrate data from your existing MySQL database:

### Option A: Manual Migration
1. Export data from MySQL using your preferred tool
2. Transform JSON fields (MySQL JSON → JSONB format is compatible)
3. Transform file URLs to Supabase Storage URLs
4. Import via SQL INSERT statements

### Option B: Script Migration
1. Connect to both databases
2. Read from MySQL, transform, write to Supabase
3. Upload files from DigitalOcean Spaces to Supabase Storage
4. Update file URLs in the files table

### File Migration
```bash
# Example: copy files from DO Spaces to Supabase Storage
# For each file in DO Spaces:
# 1. Download from: https://bolero.sgp1.digitaloceanspaces.com/{path}
# 2. Upload to Supabase Storage bucket 'media'
# 3. Update files table with new URL
```

## 8. RLS Policy Summary

| Table | Anonymous (Public) | Authenticated (Admin) |
|-------|-------------------|----------------------|
| products | SELECT | ALL |
| product_categories | SELECT | ALL |
| product_items | SELECT | ALL |
| companies | SELECT | ALL |
| blogs | SELECT | ALL |
| foods | SELECT | ALL |
| management_teams | SELECT | ALL |
| files | SELECT | ALL |
| contact_us | INSERT | ALL |
| users | — | ALL |
| blog_files | SELECT | ALL |
| food_items_product_items | SELECT | ALL |
| product_items_awards | SELECT | ALL |
| product_items_images | SELECT | ALL |

## 9. Database Schema Diagram

```
users ──< files
              │
    ┌─────────┼──────────────────────────────┐
    │         │                              │
products    companies                    management_teams
    │       │ │ │
    │       │ │ └── active_file
    │       │ └──── secondary_file
    │       │
product_categories ──< product_items ──< product_items_awards
                            │          ──< product_items_images
                            │
                        food_items_product_items >── foods
                            │
blogs ──< blog_files >── files
    │
contact_us (standalone)
```
