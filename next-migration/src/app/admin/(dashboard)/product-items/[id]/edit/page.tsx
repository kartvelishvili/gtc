import { adminGet, adminList } from "@/lib/data/admin-queries";
import { updateProductItemAction } from "@/lib/actions/admin";
import ProductItemForm from "@/app/admin/(dashboard)/product-items/_components/ProductItemForm";
import { notFound } from "next/navigation";

export default async function EditProductItemPage({ params }: { params: any }) {
  const { id } = await params;

  const [item, products, categories, companies, foods] = await Promise.all([
    adminGet("product_items", Number(id), `
      *,
      image:files!product_items_image_id_fkey(*),
      vinification:files!product_items_vinification_id_fkey(*),
      product_category:product_categories(*)
    `),
    adminList("products"),
    adminList("product_categories"),
    adminList("companies"),
    adminList("foods"),
  ]);

  if (!item) return notFound();

  // Get food IDs for this item
  const supabase = (await import("@/lib/supabase/server")).createSupabaseServerClient;
  const client = await supabase();
  const { data: foodRelations } = await client
    .from("food_items_product_items")
    .select("food_id")
    .eq("product_item_id", Number(id));

  const foodIds = (foodRelations || []).map((r: any) => r.food_id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Product Item</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <ProductItemForm
          products={products}
          categories={categories}
          companies={companies}
          foods={foods}
          action={updateProductItemAction}
          defaultValues={{ ...item, foodIds }}
        />
      </div>
    </div>
  );
}
