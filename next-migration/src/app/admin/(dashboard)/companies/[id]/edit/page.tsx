import { adminGet } from "@/lib/data/admin-queries";
import { updateCompanyAction } from "@/lib/actions/admin";
import ImageUpload from "@/app/admin/_components/ImageUpload";
import { notFound } from "next/navigation";

export default async function EditCompanyPage({ params }: { params: any }) {
  const { id } = await params;
  const company = await adminGet("companies", Number(id), "*, file:files!companies_file_id_fkey(*), secondary_file:files!companies_secondary_file_id_fkey(*), active_file:files!companies_active_file_id_fkey(*)") as any;
  if (!company) return notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Company</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form action={updateCompanyAction} className="space-y-4">
          <input type="hidden" name="id" value={company.id} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input name="name" required defaultValue={company.name} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
          </div>
          <ImageUpload label="Primary Image" name="fileId" currentUrl={company.file?.url} currentId={company.file_id} />
          <ImageUpload label="Secondary Image" name="secondaryFileId" currentUrl={company.secondary_file?.url} currentId={company.secondary_file_id} />
          <ImageUpload label="Active Image" name="activeFileId" currentUrl={company.active_file?.url} currentId={company.active_file_id} />
          <div className="flex gap-3 pt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Save</button>
            <a href="/admin/companies" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  );
}
