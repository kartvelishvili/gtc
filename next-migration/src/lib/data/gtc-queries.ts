import { createSupabaseServerClient } from "@/lib/supabase/server";
import { IProductCategory } from "@/interfaces/product-category.interface";
import { IGtcProduct } from "@/interfaces/gtc-product.interface";
import { IBrand } from "@/interfaces/brand.interface";
import { IService } from "@/interfaces/service.interface";
import { IProject } from "@/interfaces/project.interface";
import { INews } from "@/interfaces/news.interface";
import { IHeroSlide } from "@/interfaces/hero-slide.interface";
import { IContactSubmission } from "@/interfaces/contact.interface";

// ─── Helper: snake_case → camelCase mapper ──────────────────

function toCamelCase(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    result[camelKey] = obj[key];
  }
  return result;
}

// ─── Hero Slides ────────────────────────────────────────────

export async function getHeroSlides(): Promise<IHeroSlide[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*, image:files!hero_slides_image_id_fkey(*)")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getHeroSlides error:", error);
    return [];
  }
  return (data ?? []).map((d) => toCamelCase(d) as IHeroSlide);
}

// ─── Product Categories ─────────────────────────────────────

export async function getProductCategories(): Promise<IProductCategory[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("product_categories")
    .select("*, image:files!product_categories_image_id_fkey(*)")
    .is("deleted_at", null)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getProductCategories error:", error);
    return [];
  }
  return (data ?? []).map((d) => toCamelCase(d) as IProductCategory);
}

export async function getProductCategory(
  slug: string
): Promise<IProductCategory | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("product_categories")
    .select("*, image:files!product_categories_image_id_fkey(*)")
    .eq("slug", slug)
    .is("deleted_at", null)
    .single();

  if (error) return null;
  return toCamelCase(data) as IProductCategory;
}

// ─── Brands ─────────────────────────────────────────────────

export async function getBrands(): Promise<IBrand[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("brands")
    .select("*, logo:files!brands_logo_id_fkey(*)")
    .is("deleted_at", null)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getBrands error:", error);
    return [];
  }
  return (data ?? []).map((d) => toCamelCase(d) as IBrand);
}

// ─── Products ───────────────────────────────────────────────

export async function getGtcProducts(filters?: {
  categorySlug?: string;
  brandSlug?: string;
  isFeatured?: boolean;
  page?: number;
  pageSize?: number;
}): Promise<{ products: IGtcProduct[]; total: number }> {
  const supabase = await createSupabaseServerClient();
  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 12;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("products")
    .select(
      `
      *,
      image:files!products_image_id_fkey(*),
      category:product_categories!products_category_id_fkey(
        id, slug, name
      ),
      brand:brands!products_brand_id_fkey(
        id, name, slug
      ),
      images:product_images(file:files(*), sort_order),
      documents:product_documents(id, title, file:files(*), sort_order)
    `,
      { count: "exact" }
    )
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (filters?.isFeatured) {
    query = query.eq("is_featured", true);
  }

  if (filters?.categorySlug) {
    query = query.eq("category.slug", filters.categorySlug);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("getGtcProducts error:", error);
    return { products: [], total: 0 };
  }

  return {
    products: (data ?? []).map((d) => toCamelCase(d) as IGtcProduct),
    total: count ?? 0,
  };
}

export async function getGtcProduct(
  slug: string
): Promise<IGtcProduct | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      image:files!products_image_id_fkey(*),
      category:product_categories!products_category_id_fkey(*),
      brand:brands!products_brand_id_fkey(*),
      images:product_images(file:files(*), sort_order),
      documents:product_documents(id, title, file:files(*), sort_order)
    `
    )
    .eq("slug", slug)
    .is("deleted_at", null)
    .single();

  if (error) return null;
  return toCamelCase(data) as IGtcProduct;
}

export async function getRelatedProducts(
  productId: number,
  categoryId: number,
  limit: number = 4
): Promise<IGtcProduct[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      image:files!products_image_id_fkey(*),
      category:product_categories!products_category_id_fkey(id, slug, name),
      brand:brands!products_brand_id_fkey(id, name, slug)
    `
    )
    .eq("category_id", categoryId)
    .neq("id", productId)
    .is("deleted_at", null)
    .limit(limit);

  if (error) return [];
  return (data ?? []).map((d) => toCamelCase(d) as IGtcProduct);
}

// ─── Services ───────────────────────────────────────────────

export async function getServices(): Promise<IService[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("services")
    .select("*, image:files!services_image_id_fkey(*)")
    .is("deleted_at", null)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getServices error:", error);
    return [];
  }
  return (data ?? []).map((d) => toCamelCase(d) as IService);
}

export async function getService(
  slug: string
): Promise<IService | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("services")
    .select("*, image:files!services_image_id_fkey(*)")
    .eq("slug", slug)
    .is("deleted_at", null)
    .single();

  if (error) return null;
  return toCamelCase(data) as IService;
}

// ─── Projects ───────────────────────────────────────────────

export async function getProjects(filters?: {
  category?: string;
  isFeatured?: boolean;
  page?: number;
  pageSize?: number;
}): Promise<{ projects: IProject[]; total: number }> {
  const supabase = await createSupabaseServerClient();
  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 6;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("projects")
    .select(
      `
      *,
      image:files!projects_image_id_fkey(*),
      images:project_images(file:files(*), sort_order),
      used_products:project_products(product:products(id, slug, name, image:files!products_image_id_fkey(*))),
      used_services:project_services(service:services(id, slug, name))
    `,
      { count: "exact" }
    )
    .is("deleted_at", null)
    .order("start_date", { ascending: false, nullsFirst: false })
    .range(from, to);

  if (filters?.category && filters.category !== "all") {
    query = query.eq("category", filters.category);
  }

  if (filters?.isFeatured) {
    query = query.eq("is_featured", true);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("getProjects error:", error);
    return { projects: [], total: 0 };
  }

  return {
    projects: (data ?? []).map((d) => toCamelCase(d) as IProject),
    total: count ?? 0,
  };
}

export async function getProject(slug: string): Promise<IProject | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      image:files!projects_image_id_fkey(*),
      images:project_images(file:files(*), sort_order),
      used_products:project_products(product:products(id, slug, name, image:files!products_image_id_fkey(*))),
      used_services:project_services(service:services(id, slug, name))
    `
    )
    .eq("slug", slug)
    .is("deleted_at", null)
    .single();

  if (error) return null;
  return toCamelCase(data) as IProject;
}

// ─── News ───────────────────────────────────────────────────

export async function getNews(filters?: {
  category?: string;
  year?: number;
  isFeatured?: boolean;
  page?: number;
  pageSize?: number;
}): Promise<{ news: INews[]; total: number }> {
  const supabase = await createSupabaseServerClient();
  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 9;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("news")
    .select(
      `
      *,
      image:files!news_image_id_fkey(*),
      images:news_images(file:files(*), sort_order)
    `,
      { count: "exact" }
    )
    .is("deleted_at", null)
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .range(from, to);

  if (filters?.category && filters.category !== "all") {
    query = query.eq("category", filters.category);
  }

  if (filters?.year) {
    const startOfYear = `${filters.year}-01-01T00:00:00Z`;
    const endOfYear = `${filters.year}-12-31T23:59:59Z`;
    query = query.gte("published_at", startOfYear).lte("published_at", endOfYear);
  }

  if (filters?.isFeatured) {
    query = query.eq("is_featured", true);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("getNews error:", error);
    return { news: [], total: 0 };
  }

  return {
    news: (data ?? []).map((d) => toCamelCase(d) as INews),
    total: count ?? 0,
  };
}

export async function getNewsItem(slug: string): Promise<INews | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("news")
    .select(
      `
      *,
      image:files!news_image_id_fkey(*),
      images:news_images(file:files(*), sort_order)
    `
    )
    .eq("slug", slug)
    .is("deleted_at", null)
    .single();

  if (error) return null;
  return toCamelCase(data) as INews;
}

// ─── Contact Submissions ────────────────────────────────────

export async function createContactSubmission(
  submission: Omit<IContactSubmission, "id" | "isRead" | "createdAt">
): Promise<IContactSubmission | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .insert({
      first_name: submission.firstName,
      last_name: submission.lastName,
      email: submission.email,
      phone: submission.phone ?? "",
      subject: submission.subject ?? "",
      message: submission.message,
    })
    .select()
    .single();

  if (error) {
    console.error("createContactSubmission error:", error);
    return null;
  }
  return toCamelCase(data) as IContactSubmission;
}

// ─── Admin: Get Contact Submissions ─────────────────────────

export async function getContactSubmissions(filters?: {
  isRead?: boolean;
  page?: number;
  pageSize?: number;
}): Promise<{ submissions: IContactSubmission[]; total: number }> {
  const supabase = await createSupabaseServerClient();
  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 20;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("contact_submissions")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (filters?.isRead !== undefined) {
    query = query.eq("is_read", filters.isRead);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("getContactSubmissions error:", error);
    return { submissions: [], total: 0 };
  }

  return {
    submissions: (data ?? []).map((d) => toCamelCase(d) as IContactSubmission),
    total: count ?? 0,
  };
}
