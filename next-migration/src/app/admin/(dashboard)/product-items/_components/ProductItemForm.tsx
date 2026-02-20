"use client";

import { FC, useState } from "react";
import LocaleField from "@/app/admin/_components/LocaleField";
import ImageUpload from "@/app/admin/_components/ImageUpload";

interface Props {
  products: any[];
  categories: any[];
  companies: any[];
  foods: any[];
  action: (formData: FormData) => void;
  defaultValues?: any;
}

const glassTypes = ["wine", "burgundy", "cordial", "champagne", "cognac"];

const ProductItemForm: FC<Props> = ({
  products,
  categories,
  companies,
  foods,
  action,
  defaultValues,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<number | "">(
    defaultValues?.productCategory?.product_id || ""
  );
  const [selectedFoods, setSelectedFoods] = useState<number[]>(
    defaultValues?.foodIds || []
  );
  const [isPopular, setIsPopular] = useState(defaultValues?.is_popular || false);

  const filteredCategories = selectedProduct
    ? categories.filter((c: any) => c.product_id === Number(selectedProduct))
    : categories;

  const handleSubmit = (formData: FormData) => {
    const payload = {
      name: JSON.parse(formData.get("name") as string),
      description: JSON.parse(formData.get("description") as string),
      color: JSON.parse(formData.get("color") as string),
      composition: isPopular ? JSON.parse(formData.get("composition") as string || "null") : null,
      viticulture: isPopular ? JSON.parse(formData.get("viticulture") as string || "null") : null,
      aged: isPopular ? JSON.parse(formData.get("aged") as string || "null") : null,
      volume: isPopular ? JSON.parse(formData.get("volume") as string || "null") : null,
      imageId: Number(formData.get("imageId")),
      vinificationId: Number(formData.get("vinificationId")),
      alcohol: Number(formData.get("alcohol")),
      temperature: formData.get("temperature"),
      productCategoryId: Number(formData.get("productCategoryId")),
      glass: formData.get("glass"),
      sweetness: Number(formData.get("sweetness")),
      tannins: Number(formData.get("tannins")),
      fruitTones: Number(formData.get("fruitTones")),
      body: Number(formData.get("body")),
      companyId: Number(formData.get("companyId")),
      foodIds: selectedFoods,
      isPopular,
      awardIds: [],
      imageIds: [],
    };

    const fd = new FormData();
    if (defaultValues?.id) fd.set("id", String(defaultValues.id));
    fd.set("payload", JSON.stringify(payload));
    action(fd);
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 gap-4">
        <LocaleField label="Name" name="name" defaultValue={defaultValues?.name} />
        <LocaleField label="Description" name="description" defaultValue={defaultValues?.description} textarea />
        <LocaleField label="Color" name="color" defaultValue={defaultValues?.color} />
      </div>

      {/* Images */}
      <div className="grid grid-cols-2 gap-4">
        <ImageUpload
          label="Main Image"
          name="imageId"
          currentUrl={defaultValues?.image?.url}
          currentId={defaultValues?.image_id}
        />
        <ImageUpload
          label="Vinification"
          name="vinificationId"
          currentUrl={defaultValues?.vinification?.url}
          currentId={defaultValues?.vinification_id}
        />
      </div>

      {/* Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alcohol %</label>
          <input name="alcohol" type="number" step="0.1" defaultValue={defaultValues?.alcohol || 0} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
          <input name="temperature" defaultValue={defaultValues?.temperature || ""} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sweetness</label>
          <input name="sweetness" type="number" defaultValue={defaultValues?.sweetness || 0} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tannins</label>
          <input name="tannins" type="number" defaultValue={defaultValues?.tannins || 0} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fruit Tones</label>
          <input name="fruitTones" type="number" defaultValue={defaultValues?.fruit_tones || 0} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
          <input name="body" type="number" defaultValue={defaultValues?.body || 0} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Glass Type</label>
          <select name="glass" defaultValue={defaultValues?.glass || "wine"} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900">
            {glassTypes.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Relations */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product (for category filter)</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(Number(e.target.value) || "")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900"
          >
            <option value="">All products</option>
            {products.map((p: any) => (
              <option key={p.id} value={p.id}>{p.name?.en || p.name?.ge}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="productCategoryId" required defaultValue={defaultValues?.product_category_id || ""} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900">
            <option value="">Select category...</option>
            {filteredCategories.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name?.en || c.name?.ge}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <select name="companyId" required defaultValue={defaultValues?.company_id || ""} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900">
            <option value="">Select company...</option>
            {companies.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Foods (pairing)</label>
          <select
            multiple
            value={selectedFoods.map(String)}
            onChange={(e) => setSelectedFoods(Array.from(e.target.selectedOptions, (o) => Number(o.value)))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 h-24"
          >
            {foods.map((f: any) => (
              <option key={f.id} value={f.id}>{f.name?.en || f.name?.ge}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Popular toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isPopular"
          checked={isPopular}
          onChange={(e) => setIsPopular(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="isPopular" className="text-sm text-gray-700">Is Popular</label>
      </div>

      {/* Popular-only fields */}
      {isPopular && (
        <div className="grid grid-cols-1 gap-4 border-t pt-4">
          <h3 className="text-sm font-medium text-gray-700">Popular Wine Details</h3>
          <LocaleField label="Composition" name="composition" defaultValue={defaultValues?.composition} />
          <LocaleField label="Viticulture" name="viticulture" defaultValue={defaultValues?.viticulture} />
          <LocaleField label="Aged" name="aged" defaultValue={defaultValues?.aged} />
          <LocaleField label="Volume" name="volume" defaultValue={defaultValues?.volume} />
        </div>
      )}

      {/* Submit */}
      <div className="flex gap-3 pt-4">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
          {defaultValues ? "Save" : "Create"}
        </button>
        <a href="/admin/product-items" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">
          Cancel
        </a>
      </div>
    </form>
  );
};

export default ProductItemForm;
