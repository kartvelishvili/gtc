import { adminList } from "@/lib/data/admin-queries";
import { deleteCompanyAction } from "@/lib/actions/admin";
import Link from "next/link";
import DeleteButton from "@/app/admin/_components/DeleteButton";

export default async function CompaniesPage() {
  const companies = await adminList("companies", {
    select: "*, file:files!companies_file_id_fkey(*)",
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
        <Link href="/admin/companies/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">+ Add Company</Link>
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
            {companies.map((c: any) => (
              <tr key={c.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{c.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{c.name}</td>
                <td className="px-6 py-4">{c.file?.url && <img src={c.file.url} alt="" className="h-10 w-auto rounded" />}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link href={`/admin/companies/${c.id}/edit`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</Link>
                  <DeleteButton action={deleteCompanyAction} id={c.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
