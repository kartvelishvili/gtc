import { adminGet } from "@/lib/data/admin-queries";
import { updateFoodAction } from "@/lib/actions/admin";
import LocaleField from "@/app/admin/_components/LocaleField";
import ImageUpload from "@/app/admin/_components/ImageUpload";
import { notFound } from "next/navigation";

export default async function EditFoodPage({ params }: { params: any }) {
  const { id } = await params;
  const food = await adminGet("foods", Number(id), "*, image:files!foods_image_id_fkey(*)") as any;
  if (!food) return notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Food</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form action={updateFoodAction} className="space-y-4">
          <input type="hidden" name="id" value={food.id} />
          <LocaleField label="Name" name="name" defaultValue={food.name} />
          <ImageUpload label="Image" name="imageId" currentUrl={food.image?.url} currentId={food.image_id} />
          <div className="flex gap-3 pt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Save</button>
            <a href="/admin/foods" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  );
}
