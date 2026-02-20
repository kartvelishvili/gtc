import { adminGet, adminList } from "@/lib/data/admin-queries";
import { updateProductCategoryAction } from "@/lib/actions/admin";
import LocaleField from "@/app/admin/_components/LocaleField";
import { notFound } from "next/navigation";

export default async function EditProductCategoryPage({ params }: { params: any }) {
  const { id } = await params;
  const category = await adminGet("product_categories", Number(id)) as any;
  if (!category) return notFound();
  const products = await adminList("products");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Category</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form action={updateProductCategoryAction} className="space-y-4">
          <input type="hidden" name="id" value={category.id} />
          <LocaleField label="Name" name="name" defaultValue={category.name} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <select name="productId" required defaultValue={category.product_id} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900">
              {products.map((p: any) => (
                <option key={p.id} value={p.id}>{p.name?.en || p.name?.ge}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Save</button>
            <a href="/admin/product-categories" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  );
}
