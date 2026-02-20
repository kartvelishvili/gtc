import { getDictionary } from "@/app/dictionaries/dictionaries";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ProductCard from "@/components/ProductCard/ProductCard";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import { getProductCategories, getGtcProducts } from "@/lib/data/gtc-queries";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as any;
  return {
    title: dict.meta?.products || "Products",
    description: dict.products?.intro || "",
  };
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const { lang } = await params;
  const search = await searchParams;
  const dict = (await getDictionary(lang)) as any;

  const page = parseInt(search?.page || "1", 10);
  const categorySlug = search?.category || undefined;

  const [categories, productsResult] = await Promise.all([
    getProductCategories(),
    getGtcProducts({ categorySlug, page, pageSize: 12 }),
  ]);

  const products = productsResult.products;
  const totalPages = Math.ceil((productsResult.total || 0) / 12);

  return (
    <>
      <section className="gtc-page-hero">
        <div className="gtc-container">
          <Breadcrumb
            items={[{ label: dict.nav?.products || "Products" }]}
            homeLabel={dict.nav?.home || "Home"}
            locale={lang}
          />
          <h1 className="gtc-page-hero__title">{dict.products?.title || "Products"}</h1>
          <p className="gtc-page-hero__subtitle">{dict.products?.intro || ""}</p>
        </div>
      </section>

      <section className="gtc-section">
        <div className="gtc-container">
          {/* Category Filter Bar */}
          <div className="gtc-filter-bar">
            <Link
              href={`/${lang}/products`}
              className={`gtc-filter-bar__item ${!categorySlug ? "gtc-filter-bar__item--active" : ""}`}
            >
              {dict.common?.all || "All"}
            </Link>
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/${lang}/products?category=${cat.slug}`}
                className={`gtc-filter-bar__item ${categorySlug === cat.slug ? "gtc-filter-bar__item--active" : ""}`}
              >
                {cat.name?.[lang] || cat.name?.ka || cat.slug}
              </Link>
            ))}
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="gtc-grid gtc-grid--3">
              {products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  slug={product.slug}
                  name={product.name?.[lang] || product.name?.ka || ""}
                  categoryName={product.category?.name?.[lang] || product.category?.name?.ka || ""}
                  image={product.images?.[0]?.url || null}
                  brandName={product.brand?.name || undefined}
                  locale={lang}
                  dict={{ viewDetails: dict.common?.viewDetails || "View Details" }}
                />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", padding: "48px 0", color: "var(--color-text-muted)" }}>
              {dict.products?.noResults || "No products found."}
            </p>
          )}

          {/* Pagination — fixes `pagination.next` raw key bug */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl={`/${lang}/products${categorySlug ? `?category=${categorySlug}` : ""}`}
            dict={{
              previous: dict.common?.pagination?.previous || "Previous",
              next: dict.common?.pagination?.next || "Next",
            }}
          />
        </div>
      </section>
    </>
  );
}
