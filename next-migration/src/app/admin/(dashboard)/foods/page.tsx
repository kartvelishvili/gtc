import { adminList } from "@/lib/data/admin-queries";
import { deleteFoodAction } from "@/lib/actions/admin";
import Link from "next/link";
import DeleteButton from "@/app/admin/_components/DeleteButton";

export default async function FoodsPage() {
  const foods = await adminList("foods", {
    select: "*, image:files!foods_image_id_fkey(*)",
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Foods</h1>
        <Link href="/admin/foods/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">+ Add Food</Link>
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
            {foods.map((f: any) => (
              <tr key={f.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{f.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{f.name?.en || f.name?.ge || "—"}</td>
                <td className="px-6 py-4">{f.image?.url && <img src={f.image.url} alt="" className="h-10 w-auto rounded" />}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link href={`/admin/foods/${f.id}/edit`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</Link>
                  <DeleteButton action={deleteFoodAction} id={f.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
