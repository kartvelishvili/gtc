import { adminList } from "@/lib/data/admin-queries";
import { deleteProductAction } from "@/lib/actions/admin";
import Link from "next/link";
import DeleteButton from "@/app/admin/_components/DeleteButton";

export default async function ProductsPage() {
  const products = await adminList("products", {
    select: "*, file:files!products_image_id_fkey(*)",
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          + Add Product
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((p: any) => (
              <tr key={p.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{p.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {p.name?.en || p.name?.ge || "—"}
                </td>
                <td className="px-6 py-4">
                  {p.file?.url && (
                    <img src={p.file.url} alt="" className="h-10 w-auto rounded" />
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <DeleteButton action={deleteProductAction} id={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
