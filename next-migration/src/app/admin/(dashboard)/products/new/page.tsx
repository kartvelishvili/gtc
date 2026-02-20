import { createProductAction } from "@/lib/actions/admin";
import LocaleField from "@/app/admin/_components/LocaleField";
import ImageUpload from "@/app/admin/_components/ImageUpload";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Product</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form action={createProductAction} className="space-y-4">
          <LocaleField label="Name" name="name" />
          <ImageUpload label="Image" name="imageId" />
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Create
            </button>
            <a href="/admin/products" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
