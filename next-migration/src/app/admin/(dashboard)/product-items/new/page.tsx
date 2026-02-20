import { adminList } from "@/lib/data/admin-queries";
import { createProductItemAction } from "@/lib/actions/admin";
import ProductItemForm from "@/app/admin/(dashboard)/product-items/_components/ProductItemForm";

export default async function NewProductItemPage() {
  const [products, categories, companies, foods] = await Promise.all([
    adminList("products"),
    adminList("product_categories"),
    adminList("companies"),
    adminList("foods"),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Product Item</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <ProductItemForm
          products={products}
          categories={categories}
          companies={companies}
          foods={foods}
          action={createProductItemAction}
        />
      </div>
    </div>
  );
}
