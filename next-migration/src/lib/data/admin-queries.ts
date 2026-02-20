import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// ─── Auth ───────────────────────────────────────────────────

export async function getSession() {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

// ─── File Upload ────────────────────────────────────────────

export async function uploadFile(file: File): Promise<{ id: number; url: string } | null> {
  const supabase = await createSupabaseServerClient();
  const session = await getSession();
  if (!session) return null;

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
    .insert({ url: publicUrl, user_id: session.user.id })
    .select()
    .single();

  if (error) {
    console.error("File record error:", error);
    return null;
  }

  return { id: data.id, url: data.url };
}

// ─── Generic CRUD ───────────────────────────────────────────

export async function adminList(table: string, options?: {
  select?: string;
  search?: { column: string; value: string };
  filters?: Record<string, unknown>;
  orderBy?: string;
}): Promise<any[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from(table)
    .select(options?.select || "*")
    .is("deleted_at", null)
    .order(options?.orderBy || "id", { ascending: true });

  if (options?.search?.value) {
    query = query.ilike(options.search.column, `%${options.search.value}%`);
  }

  if (options?.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });
  }

  const { data, error } = await query;
  if (error) {
    console.error(`adminList(${table}) error:`, error);
    return [];
  }
  return data ?? [];
}

export async function adminGet(table: string, id: number, select?: string): Promise<any | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(table)
    .select(select || "*")
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error) return null;
  return data;
}

export async function adminCreate(table: string, record: Record<string, unknown>) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(table)
    .insert(record)
    .select()
    .single();

  if (error) {
    console.error(`adminCreate(${table}) error:`, error);
    return { error: error.message };
  }
  return { data };
}

export async function adminUpdate(table: string, id: number, record: Record<string, unknown>) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(table)
    .update(record)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`adminUpdate(${table}) error:`, error);
    return { error: error.message };
  }
  return { data };
}

export async function adminDelete(table: string, id: number) {
  const supabase = await createSupabaseServerClient();
  // Soft delete
  const { error } = await supabase
    .from(table)
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error(`adminDelete(${table}) error:`, error);
    return { error: error.message };
  }
  return { success: true };
}

// ─── Join Table Operations ──────────────────────────────────

export async function adminSetJoinTable(
  table: string,
  ownerColumn: string,
  ownerId: number,
  relatedColumn: string,
  relatedIds: number[]
) {
  const supabase = await createSupabaseServerClient();

  // Delete existing relations
  await supabase.from(table).delete().eq(ownerColumn, ownerId);

  // Insert new relations
  if (relatedIds.length > 0) {
    const rows = relatedIds.map((relId) => ({
      [ownerColumn]: ownerId,
      [relatedColumn]: relId,
    }));
    const { error } = await supabase.from(table).insert(rows);
    if (error) console.error(`adminSetJoinTable(${table}) error:`, error);
  }
}
