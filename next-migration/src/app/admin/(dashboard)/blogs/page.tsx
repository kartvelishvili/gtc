import { adminList } from "@/lib/data/admin-queries";
import { deleteBlogAction } from "@/lib/actions/admin";
import Link from "next/link";
import DeleteButton from "@/app/admin/_components/DeleteButton";

export default async function BlogsPage() {
  const blogs = await adminList("blogs", {
    select: "*, file:files!blogs_file_id_fkey(*)",
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
        <Link href="/admin/blogs/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">+ Add Blog</Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visible on Home</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map((b: any) => (
              <tr key={b.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{b.title?.en || b.title?.ge || "—"}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{b.type}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{b.visible_on_home ? "Yes" : "No"}</td>
                <td className="px-6 py-4">{b.file?.url && <img src={b.file.url} alt="" className="h-10 w-auto rounded" />}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link href={`/admin/blogs/${b.id}/edit`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</Link>
                  <DeleteButton action={deleteBlogAction} id={b.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
