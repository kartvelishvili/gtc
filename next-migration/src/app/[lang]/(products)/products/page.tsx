import { Products } from "./components/Products/Products";
import { NextPage } from "next";
import { getProducts, getCompanies } from "@/lib/data/queries";

const ProductsPage: NextPage<{ params: any; searchParams: any }> = async ({
  searchParams,
  params,
}) => {
  const { productId, companyId } = await searchParams;
  const { lang } = await params;
  const products = await getProducts();
  const companies = await getCompanies({
    productId: productId ? Number(productId) : undefined,
    id: companyId ? Number(companyId) : undefined,
  });
  const allCompany = await getCompanies({
    productId: productId ? Number(productId) : undefined,
  });


  return (
    <div>
      <Products
        locale={lang}
        allCompanies={allCompany}
        products={products}
        activeProductId={Number(productId)}
        companies={companies}
      />
    </div>
  );
};

export default ProductsPage;
