import { createCompanyAction } from "@/lib/actions/admin";
import ImageUpload from "@/app/admin/_components/ImageUpload";

export default function NewCompanyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Company</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form action={createCompanyAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
          </div>
          <ImageUpload label="Primary Image" name="fileId" />
          <ImageUpload label="Secondary Image" name="secondaryFileId" />
          <ImageUpload label="Active Image" name="activeFileId" />
          <div className="flex gap-3 pt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Create</button>
            <a href="/admin/companies" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  );
}
