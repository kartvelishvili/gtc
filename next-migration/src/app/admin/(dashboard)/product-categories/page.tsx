import { adminList } from "@/lib/data/admin-queries";
import { deleteProductCategoryAction } from "@/lib/actions/admin";
import Link from "next/link";
import DeleteButton from "@/app/admin/_components/DeleteButton";

export default async function ProductCategoriesPage() {
  const categories = await adminList("product_categories", {
    select: "*, product:products(*)",
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Product Categories</h1>
        <Link
          href="/admin/product-categories/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          + Add Category
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((c: any) => (
              <tr key={c.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{c.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{c.name?.en || c.name?.ge || "—"}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{c.product?.name?.en || "—"}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link href={`/admin/product-categories/${c.id}/edit`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</Link>
                  <DeleteButton action={deleteProductCategoryAction} id={c.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
