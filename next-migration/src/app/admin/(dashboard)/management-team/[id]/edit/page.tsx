import { adminGet } from "@/lib/data/admin-queries";
import { updateManagementTeamAction } from "@/lib/actions/admin";
import LocaleField from "@/app/admin/_components/LocaleField";
import ImageUpload from "@/app/admin/_components/ImageUpload";
import { notFound } from "next/navigation";

export default async function EditManagementTeamPage({ params }: { params: any }) {
  const { id } = await params;
  const member = await adminGet("management_teams", Number(id), "*, image:files!management_teams_image_id_fkey(*)") as any;
  if (!member) return notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Team Member</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form action={updateManagementTeamAction} className="space-y-4">
          <input type="hidden" name="id" value={member.id} />
          <LocaleField label="First Name" name="firstName" defaultValue={member.first_name} />
          <LocaleField label="Last Name" name="lastName" defaultValue={member.last_name} />
          <LocaleField label="Profession" name="profession" defaultValue={member.profession} />
          <ImageUpload label="Photo" name="imageId" currentUrl={member.image?.url} currentId={member.image_id} />
          <div className="flex gap-3 pt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Save</button>
            <a href="/admin/management-team" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  );
}
