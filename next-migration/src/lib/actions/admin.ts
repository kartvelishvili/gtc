"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  adminCreate,
  adminUpdate,
  adminDelete,
  adminSetJoinTable,
} from "@/lib/data/admin-queries";

// ─── Auth Actions ───────────────────────────────────────────

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ─── File Upload Action ─────────────────────────────────────

export async function uploadFileAction(formData: FormData): Promise<{ id: number; url: string } | null> {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) return null;

  const supabase = await createSupabaseServerClient();
  const ext = file.name.split(".").pop();
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(path, file);

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);

  const { data, error } = await supabase
    .from("files")
    .insert({ url: publicUrl, user_id: null })
    .select()
    .single();

  if (error) {
    console.error("File insert error:", error);
    return null;
  }

  return { id: data.id, url: data.url };
}

export async function uploadMultipleFilesAction(formData: FormData): Promise<{ id: number; url: string }[]> {
  const files = formData.getAll("files") as File[];
  const results: { id: number; url: string }[] = [];

  for (const file of files) {
    if (file.size === 0) continue;
    const fd = new FormData();
    fd.set("file", file);
    const result = await uploadFileAction(fd);
    if (result) results.push(result);
  }

  return results;
}

// ─── Product Actions ────────────────────────────────────────

export async function createProductAction(formData: FormData) {
  const name = JSON.parse(formData.get("name") as string);
  const imageId = Number(formData.get("imageId"));

  const result = await adminCreate("products", { name, image_id: imageId });
  if (result.error) throw new Error(result.error);

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProductAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = JSON.parse(formData.get("name") as string);
  const imageId = Number(formData.get("imageId"));

  const result = await adminUpdate("products", id, { name, image_id: imageId });
  if (result.error) throw new Error(result.error);

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProductAction(formData: FormData) {
  const id = Number(formData.get("id"));
  await adminDelete("products", id);
  revalidatePath("/admin/products");
}

// ─── Product Category Actions ───────────────────────────────

export async function createProductCategoryAction(formData: FormData) {
  const name = JSON.parse(formData.get("name") as string);
  const productId = Number(formData.get("productId"));

  const result = await adminCreate("product_categories", { name, product_id: productId });
  if (result.error) throw new Error(result.error);

  revalidatePath("/admin/product-categories");
  redirect("/admin/product-categories");
}

export async function updateProductCategoryAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = JSON.parse(formData.get("name") as string);
  const productId = Number(formData.get("productId"));

  const result = await adminUpdate("product_categories", id, { name, product_id: productId });
  if (result.error) throw new Error(result.error);

  revalidatePath("/admin/product-categories");
  redirect("/admin/product-categories");
}

export async function deleteProductCategoryAction(formData: FormData) {
  const id = Number(formData.get("id"));
  await adminDelete("product_categories", id);
  revalidatePath("/admin/product-categories");
}

// ─── Product Item Actions ───────────────────────────────────

export async function createProductItemAction(formData: FormData) {
  const payload = JSON.parse(formData.get("payload") as string);

  const record = {
    name: payload.name,
    image_id: payload.imageId,
    description: payload.description,
    alcohol: payload.alcohol,
    temperature: payload.temperature,
    color: payload.color,
    vinification_id: payload.vinificationId,
    fruit_tones: payload.fruitTones,
    tannins: payload.tannins,
    sweetness: payload.sweetness,
    body: payload.body,
    glass: payload.glass,
    product_category_id: payload.productCategoryId,
    company_id: payload.companyId,
    is_popular: payload.isPopular ?? false,
    composition: payload.composition || null,
    viticulture: payload.viticulture || null,
    aged: payload.aged || null,
    volume: payload.volume || null,
  };

  const result = await adminCreate("product_items", record);
  if (result.error) throw new Error(result.error);

  const itemId = result.data.id;

  // Set join tables
  if (payload.foodIds?.length) {
    await adminSetJoinTable("food_items_product_items", "product_item_id", itemId, "food_id", payload.foodIds);
  }
  if (payload.awardIds?.length) {
    await adminSetJoinTable("product_items_awards", "product_item_id", itemId, "file_id", payload.awardIds);
  }
  if (payload.imageIds?.length) {
    await adminSetJoinTable("product_items_images", "product_item_id", itemId, "file_id", payload.imageIds);
  }

  revalidatePath("/admin/product-items");
  redirect("/admin/product-items");
}

export async function updateProductItemAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const payload = JSON.parse(formData.get("payload") as string);

  const record = {
    name: payload.name,
    image_id: payload.imageId,
    description: payload.description,
    alcohol: payload.alcohol,
    temperature: payload.temperature,
    color: payload.color,
    vinification_id: payload.vinificationId,
    fruit_tones: payload.fruitTones,
    tannins: payload.tannins,
    sweetness: payload.sweetness,
    body: payload.body,
    glass: payload.glass,
    product_category_id: payload.productCategoryId,
    company_id: payload.companyId,
    is_popular: payload.isPopular ?? false,
    composition: payload.composition || null,
    viticulture: payload.viticulture || null,
    aged: payload.aged || null,
    volume: payload.volume || null,
  };

  await adminUpdate("product_items", id, record);

  // Update join tables
  await adminSetJoinTable("food_items_product_items", "product_item_id", id, "food_id", payload.foodIds ?? []);
  await adminSetJoinTable("product_items_awards", "product_item_id", id, "file_id", payload.awardIds ?? []);
  await adminSetJoinTable("product_items_images", "product_item_id", id, "file_id", payload.imageIds ?? []);

  revalidatePath("/admin/product-items");
  redirect("/admin/product-items");
}

export async function deleteProductItemAction(formData: FormData) {
  const id = Number(formData.get("id"));
  await adminDelete("product_items", id);
  revalidatePath("/admin/product-items");
}

// ─── Blog Actions ───────────────────────────────────────────

export async function createBlogAction(formData: FormData) {
  const title = JSON.parse(formData.get("title") as string);
  const description = JSON.parse(formData.get("description") as string);
  const fileId = Number(formData.get("fileId"));
  const type = formData.get("type") as string;
  const visibleOnHome = formData.get("visibleOnHome") === "true";
  const galleryIds = JSON.parse(formData.get("galleryIds") as string || "[]") as number[];

  const result = await adminCreate("blogs", {
    title,
    description,
    file_id: fileId,
    type,
    visible_on_home: visibleOnHome,
  });
  if (result.error) throw new Error(result.error);

  if (galleryIds.length) {
    await adminSetJoinTable("blog_files", "blog_id", result.data.id, "file_id", galleryIds);
  }

  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function updateBlogAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = JSON.parse(formData.get("title") as string);
  const description = JSON.parse(formData.get("description") as string);
  const fileId = Number(formData.get("fileId"));
  const type = formData.get("type") as string;
  const visibleOnHome = formData.get("visibleOnHome") === "true";
  const galleryIds = JSON.parse(formData.get("galleryIds") as string || "[]") as number[];

  await adminUpdate("blogs", id, {
    title,
    description,
    file_id: fileId,
    type,
    visible_on_home: visibleOnHome,
  });

  await adminSetJoinTable("blog_files", "blog_id", id, "file_id", galleryIds);

  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function deleteBlogAction(formData: FormData) {
  const id = Number(formData.get("id"));
  await adminDelete("blogs", id);
  revalidatePath("/admin/blogs");
}

// ─── Company Actions ────────────────────────────────────────

export async function createCompanyAction(formData: FormData) {
  const name = formData.get("name") as string;
  const fileId = Number(formData.get("fileId"));
  const secondaryFileId = formData.get("secondaryFileId") ? Number(formData.get("secondaryFileId")) : null;
  const activeFileId = formData.get("activeFileId") ? Number(formData.get("activeFileId")) : null;

  const result = await adminCreate("companies", {
    name,
    file_id: fileId,
    secondary_file_id: secondaryFileId,
    active_file_id: activeFileId,
  });
  if (result.error) throw new Error(result.error);

  revalidatePath("/admin/companies");
  redirect("/admin/companies");
}

export async function updateCompanyAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const fileId = Number(formData.get("fileId"));
  const secondaryFileId = formData.get("secondaryFileId") ? Number(formData.get("secondaryFileId")) : null;
  const activeFileId = formData.get("activeFileId") ? Number(formData.get("activeFileId")) : null;

  await adminUpdate("companies", id, {
    name,
    file_id: fileId,
    secondary_file_id: secondaryFileId,
    active_file_id: activeFileId,
  });

  revalidatePath("/admin/companies");
  redirect("/admin/companies");
}

export async function deleteCompanyAction(formData: FormData) {
  const id = Number(formData.get("id"));
  await adminDelete("companies", id);
  revalidatePath("/admin/companies");
}

// ─── Food Actions ───────────────────────────────────────────

export async function createFoodAction(formData: FormData) {
  const name = JSON.parse(formData.get("name") as string);
  const imageId = Number(formData.get("imageId"));

  const result = await adminCreate("foods", { name, image_id: imageId });
  if (result.error) throw new Error(result.error);

  revalidatePath("/admin/foods");
  redirect("/admin/foods");
}

export async function updateFoodAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = JSON.parse(formData.get("name") as string);
  const imageId = Number(formData.get("imageId"));

  await adminUpdate("foods", id, { name, image_id: imageId });

  revalidatePath("/admin/foods");
  redirect("/admin/foods");
}

export async function deleteFoodAction(formData: FormData) {
  const id = Number(formData.get("id"));
  await adminDelete("foods", id);
  revalidatePath("/admin/foods");
}

// ─── Management Team Actions ────────────────────────────────

export async function createManagementTeamAction(formData: FormData) {
  const firstName = JSON.parse(formData.get("firstName") as string);
  const lastName = JSON.parse(formData.get("lastName") as string);
  const profession = JSON.parse(formData.get("profession") as string);
  const imageId = Number(formData.get("imageId"));

  const result = await adminCreate("management_teams", {
    first_name: firstName,
    last_name: lastName,
    profession,
    image_id: imageId,
  });
  if (result.error) throw new Error(result.error);

  revalidatePath("/admin/management-team");
  redirect("/admin/management-team");
}

export async function updateManagementTeamAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const firstName = JSON.parse(formData.get("firstName") as string);
  const lastName = JSON.parse(formData.get("lastName") as string);
  const profession = JSON.parse(formData.get("profession") as string);
  const imageId = Number(formData.get("imageId"));

  await adminUpdate("management_teams", id, {
    first_name: firstName,
    last_name: lastName,
    profession,
    image_id: imageId,
  });

  revalidatePath("/admin/management-team");
  redirect("/admin/management-team");
}

export async function deleteManagementTeamAction(formData: FormData) {
  const id = Number(formData.get("id"));
  await adminDelete("management_teams", id);
  revalidatePath("/admin/management-team");
}
