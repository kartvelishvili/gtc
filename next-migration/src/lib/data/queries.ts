import { createSupabaseServerClient } from "@/lib/supabase/server";
import { IProduct } from "@/interfaces/product.interface";
import { IBlog } from "@/interfaces/blog.interface";
import { IProductItem } from "@/interfaces/product-item.interface";
import { ICompany } from "@/interfaces/company.interface";
import { IManagementTeam } from "@/interfaces/management-team.interface";

// ─── Products ───────────────────────────────────────────────

export async function getProducts(): Promise<IProduct[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, file:files!products_image_id_fkey(*), categories:product_categories(*)")
    .is("deleted_at", null)
    .order("id", { ascending: true });

  if (error) {
    console.error("getProducts error:", error);
    return [];
  }
  return (data ?? []).map(mapProduct);
}

export async function getProduct(id: number): Promise<IProduct | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, file:files!products_image_id_fkey(*), categories:product_categories(*)")
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error) return null;
  return mapProduct(data);
}

// ─── Product Items ──────────────────────────────────────────

export async function getProductItems(filters?: {
  isPopular?: boolean;
  productId?: number;
}): Promise<IProductItem[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("product_items")
    .select(`
      *,
      image:files!product_items_image_id_fkey(*),
      vinification:files!product_items_vinification_id_fkey(*),
      product_category:product_categories!product_items_product_category_id_fkey(
        *,
        product:products(*)
      ),
      foods(*,image:files!foods_image_id_fkey(*)),
      awards:product_items_awards(file:files(*)),
      images:product_items_images(file:files(*))
    `)
    .is("deleted_at", null);

  if (filters?.isPopular) {
    query = query.eq("is_popular", true);
  }

  if (filters?.productId) {
    query = query.eq("product_category.product_id", filters.productId);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getProductItems error:", error);
    return [];
  }
  return (data ?? []).map(mapProductItem);
}

export async function getProductItem(id: number): Promise<IProductItem | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("product_items")
    .select(`
      *,
      image:files!product_items_image_id_fkey(*),
      vinification:files!product_items_vinification_id_fkey(*),
      product_category:product_categories!product_items_product_category_id_fkey(
        *,
        product:products(*)
      ),
      foods(*,image:files!foods_image_id_fkey(*)),
      awards:product_items_awards(file:files(*)),
      images:product_items_images(file:files(*))
    `)
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error) return null;
  return mapProductItem(data);
}

export async function getRandomProductItems(excludeId: number): Promise<IProductItem[]> {
  const supabase = await createSupabaseServerClient();
  // Supabase doesn't have RANDOM() order natively; use rpc or fetch more and shuffle
  const { data, error } = await supabase
    .from("product_items")
    .select(`
      *,
      image:files!product_items_image_id_fkey(*),
      product_category:product_categories!product_items_product_category_id_fkey(*)
    `)
    .neq("id", excludeId)
    .is("deleted_at", null)
    .limit(20);

  if (error) return [];
  // Shuffle and take 9
  const shuffled = (data ?? []).sort(() => Math.random() - 0.5).slice(0, 9);
  return shuffled.map(mapProductItem);
}

// ─── Companies ──────────────────────────────────────────────

export async function getCompanies(filters?: {
  productId?: number;
  id?: number;
}): Promise<ICompany[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("companies")
    .select(`
      *,
      file:files!companies_file_id_fkey(*),
      secondary_file:files!companies_secondary_file_id_fkey(*),
      active_file:files!companies_active_file_id_fkey(*),
      product_items(
        *,
        image:files!product_items_image_id_fkey(*),
        product_category:product_categories!product_items_product_category_id_fkey(*)
      )
    `)
    .is("deleted_at", null);

  if (filters?.productId) {
    // We filter by productId after fetching, since supabase nested filters are limited
  }

  if (filters?.id) {
    query = query.eq("id", filters.id);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getCompanies error:", error);
    return [];
  }

  let mapped = (data ?? []).map(mapCompany);

  // Client-side filter by productId if needed
  if (filters?.productId) {
    mapped = mapped.map((company) => ({
      ...company,
      productItems: company.productItems.filter(
        (item: any) => item.productCategory?.product?.id === filters.productId ||
                       item.productCategory?.productId === filters.productId
      ),
    }));
  }

  return mapped;
}

// ─── Blogs ──────────────────────────────────────────────────

export async function getBlogs(filters?: {
  type?: string;
  visibleOnHome?: string;
}): Promise<IBlog[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("blogs")
    .select(`
      *,
      file:files!blogs_file_id_fkey(*),
      gallery:blog_files(file:files(*))
    `)
    .is("deleted_at", null);

  if (filters?.type) {
    query = query.eq("type", filters.type);
  }

  if (filters?.visibleOnHome !== undefined && filters.visibleOnHome !== null) {
    query = query.eq("visible_on_home", filters.visibleOnHome === "true");
  }

  const { data, error } = await query;
  if (error) {
    console.error("getBlogs error:", error);
    return [];
  }
  return (data ?? []).map(mapBlog);
}

export async function getBlog(id: number): Promise<IBlog | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("blogs")
    .select(`
      *,
      file:files!blogs_file_id_fkey(*),
      gallery:blog_files(file:files(*))
    `)
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error) return null;
  return mapBlog(data);
}

// ─── Management Team ────────────────────────────────────────

export async function getManagementTeam(): Promise<IManagementTeam[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("management_teams")
    .select("*, image:files!management_teams_image_id_fkey(*)")
    .is("deleted_at", null);

  if (error) {
    console.error("getManagementTeam error:", error);
    return [];
  }
  return (data ?? []).map(mapManagementTeam);
}

// ─── Contact Us ─────────────────────────────────────────────

export async function createContactUs(contactData: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  text: string;
}) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("contact_us")
    .insert({
      first_name: contactData.firstName,
      last_name: contactData.lastName,
      phone_number: contactData.phoneNumber,
      email: contactData.email,
      text: contactData.text,
    })
    .select()
    .single();

  if (error) {
    console.error("createContactUs error:", error);
    return null;
  }
  return data;
}

// ─── Mappers ────────────────────────────────────────────────

function mapProduct(data: any): IProduct {
  return {
    id: data.id,
    name: data.name,
    imageId: data.image_id,
    file: data.file ? { id: data.file.id, url: data.file.url } : { id: 0, url: "" },
    categories: data.categories ?? [],
  };
}

function mapProductItem(data: any): IProductItem {
  return {
    id: data.id,
    name: data.name,
    imageId: data.image_id,
    image: data.image ? { id: data.image.id, url: data.image.url } : { id: 0, url: "" },
    description: data.description,
    alcohol: data.alcohol,
    temperature: data.temperature,
    color: data.color,
    vinificationId: data.vinification_id,
    vinification: data.vinification ? { id: data.vinification.id, url: data.vinification.url } : { id: 0, url: "" },
    productCategoryId: data.product_category_id,
    productCategory: data.product_category
      ? { name: data.product_category.name }
      : { name: { en: "", ge: "", ru: "" } },
    tannins: data.tannins,
    fruitTones: data.fruit_tones,
    sweetness: data.sweetness,
    body: data.body,
    glass: data.glass,
    foods: (data.foods ?? []).map((f: any) => ({
      id: f.id,
      name: f.name,
      imageId: f.image_id,
      image: f.image ? { id: f.image.id, url: f.image.url } : { id: 0, url: "" },
    })),
    isPopular: data.is_popular,
    composition: data.composition,
    aged: data.aged,
    viticulture: data.viticulture,
    volume: data.volume,
    awards: (data.awards ?? []).map((a: any) => a.file ? { id: a.file.id, url: a.file.url } : { id: 0, url: "" }),
    images: (data.images ?? []).map((i: any) => i.file ? { id: i.file.id, url: i.file.url } : { id: 0, url: "" }),
  };
}

function mapCompany(data: any): ICompany {
  return {
    id: data.id,
    name: data.name,
    file: data.file ? { id: data.file.id, url: data.file.url } : { id: 0, url: "" },
    productItems: (data.product_items ?? []).map(mapProductItem),
    secondaryFileId: data.secondary_file_id,
    secondaryFile: data.secondary_file ? { id: data.secondary_file.id, url: data.secondary_file.url } : undefined,
    activeFile: data.active_file ? { id: data.active_file.id, url: data.active_file.url } : { id: 0, url: "" },
  };
}

function mapBlog(data: any): IBlog {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    fileId: data.file_id,
    file: data.file ? { id: data.file.id, url: data.file.url } : { id: 0, url: "" },
    type: data.type,
    gallery: (data.gallery ?? []).map((g: any) =>
      g.file ? { id: g.file.id, url: g.file.url } : { id: 0, url: "" }
    ),
    createdAt: data.created_at,
    visibleOnHome: data.visible_on_home,
  };
}

function mapManagementTeam(data: any): IManagementTeam {
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    profession: data.profession,
    imageId: data.image_id,
    image: data.image ? { id: data.image.id, url: data.image.url } : { id: 0, url: "" },
  };
}
