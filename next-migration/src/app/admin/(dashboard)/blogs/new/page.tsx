import { createBlogAction } from "@/lib/actions/admin";
import LocaleField from "@/app/admin/_components/LocaleField";
import ImageUpload from "@/app/admin/_components/ImageUpload";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Blog</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form action={createBlogAction} className="space-y-4">
          <LocaleField label="Title" name="title" />
          <LocaleField label="Description" name="description" textarea />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select name="type" required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900">
              <option value="normal">Normal</option>
              <option value="about-us">About Us</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="visibleOnHome" value="true" id="visibleOnHome" className="rounded" />
            <label htmlFor="visibleOnHome" className="text-sm text-gray-700">Visible on Home Page</label>
          </div>
          <ImageUpload label="Cover Image" name="fileId" />
          <input type="hidden" name="galleryIds" value="[]" />
          <div className="flex gap-3 pt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Create</button>
            <a href="/admin/blogs" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  );
}
