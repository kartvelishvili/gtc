import { adminList } from "@/lib/data/admin-queries";
import { deleteProductItemAction } from "@/lib/actions/admin";
import Link from "next/link";
import DeleteButton from "@/app/admin/_components/DeleteButton";

export default async function ProductItemsPage() {
  const items = await adminList("product_items", {
    select: "*, image:files!product_items_image_id_fkey(*), product_category:product_categories(*)",
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Product Items</h1>
        <Link href="/admin/product-items/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">+ Add Product Item</Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alcohol</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Popular</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item: any) => (
              <tr key={item.id}>
                <td className="px-4 py-4 text-sm text-gray-900">{item.id}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{item.name?.en || item.name?.ge || "—"}</td>
                <td className="px-4 py-4">{item.image?.url && <img src={item.image.url} alt="" className="h-10 w-auto rounded" />}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{item.alcohol}%</td>
                <td className="px-4 py-4 text-sm text-gray-500">{item.product_category?.name?.en || "—"}</td>
                <td className="px-4 py-4 text-sm">{item.is_popular ? <span className="text-green-600">Yes</span> : <span className="text-gray-400">No</span>}</td>
                <td className="px-4 py-4 text-right space-x-3">
                  <Link href={`/admin/product-items/${item.id}/edit`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</Link>
                  <DeleteButton action={deleteProductItemAction} id={item.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
