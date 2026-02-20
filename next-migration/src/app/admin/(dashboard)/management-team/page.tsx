import { adminList } from "@/lib/data/admin-queries";
import { deleteManagementTeamAction } from "@/lib/actions/admin";
import Link from "next/link";
import DeleteButton from "@/app/admin/_components/DeleteButton";

export default async function ManagementTeamPage() {
  const team = await adminList("management_teams", {
    select: "*, image:files!management_teams_image_id_fkey(*)",
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Management Team</h1>
        <Link href="/admin/management-team/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">+ Add Member</Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profession</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {team.map((m: any) => (
              <tr key={m.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{m.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{m.first_name?.en || m.first_name?.ge || "—"}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{m.last_name?.en || m.last_name?.ge || "—"}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{m.profession?.en || m.profession?.ge || "—"}</td>
                <td className="px-6 py-4">{m.image?.url && <img src={m.image.url} alt="" className="h-10 w-auto rounded" />}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link href={`/admin/management-team/${m.id}/edit`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</Link>
                  <DeleteButton action={deleteManagementTeamAction} id={m.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
