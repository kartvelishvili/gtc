import { createManagementTeamAction } from "@/lib/actions/admin";
import LocaleField from "@/app/admin/_components/LocaleField";
import ImageUpload from "@/app/admin/_components/ImageUpload";

export default function NewManagementTeamPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Team Member</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form action={createManagementTeamAction} className="space-y-4">
          <LocaleField label="First Name" name="firstName" />
          <LocaleField label="Last Name" name="lastName" />
          <LocaleField label="Profession" name="profession" />
          <ImageUpload label="Photo" name="imageId" />
          <div className="flex gap-3 pt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Create</button>
            <a href="/admin/management-team" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  );
}
