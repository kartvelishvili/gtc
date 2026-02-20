import { adminList } from "@/lib/data/admin-queries";
import { createProductCategoryAction } from "@/lib/actions/admin";
import LocaleField from "@/app/admin/_components/LocaleField";

export default async function NewProductCategoryPage() {
  const products = await adminList("products");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Product Category</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form action={createProductCategoryAction} className="space-y-4">
          <LocaleField label="Name" name="name" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <select name="productId" required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900">
              <option value="">Select product...</option>
              {products.map((p: any) => (
                <option key={p.id} value={p.id}>{p.name?.en || p.name?.ge}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Create</button>
            <a href="/admin/product-categories" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  );
}
