import { getDictionary } from "@/app/dictionaries/dictionaries";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ProductCard from "@/components/ProductCard/ProductCard";
import Image from "next/image";
import { getGtcProduct, getRelatedProducts } from "@/lib/data/gtc-queries";
import { notFound } from "next/navigation";
import type { Locale } from "@/interfaces/localized-text.interface";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { lang, id } = await params;
  const l = lang as Locale;
  const product = await getGtcProduct(id);
  if (!product) return { title: "Not Found" };
  return {
    title: product.name?.[l] || product.name?.ka || "Product",
    description: product.shortDescription?.[l] || product.shortDescription?.ka || "",
  };
}

export default async function ProductDetailPage({ params }: { params: any }) {
  const { lang, id } = await params;
  const l = lang as Locale;
  const dict = (await getDictionary(lang)) as any;
  const product = await getGtcProduct(id);

  if (!product) notFound();

  const name = product.name?.[l] || product.name?.ka || "";
  const description = product.description?.[l] || product.description?.ka || "";
  const shortDesc = product.shortDescription?.[l] || product.shortDescription?.ka || "";
  const categoryName = product.category?.name?.[l] || product.category?.name?.ka || "";
  const specs = product.specifications || [];
  const images = product.images || [];
  const documents = product.documents || [];

  const related = await getRelatedProducts(product.id, product.category?.id);

  return (
    <>
      <section className="gtc-page-hero">
        <div className="gtc-container">
          <Breadcrumb
            items={[
              { label: dict.nav?.products || "Products", href: `/${lang}/products` },
              { label: categoryName, href: `/${lang}/products?category=${product.category?.slug}` },
              { label: name },
            ]}
            homeLabel={dict.nav?.home || "Home"}
            locale={lang}
          />
          <h1 className="gtc-page-hero__title">{name}</h1>
        </div>
      </section>

      <section className="gtc-section">
        <div className="gtc-container" style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
          {/* Image gallery */}
          <div style={{ flex: "1 1 400px" }}>
            {images.length > 0 ? (
              <Image
                src={images[0].url}
                alt={name}
                width={600}
                height={450}
                style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                priority
              />
            ) : (
              <div style={{
                aspectRatio: "4/3",
                background: "var(--color-bg-secondary)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div style={{ display: "flex", gap: "8px", marginTop: "12px", overflowX: "auto" }}>
                {images.map((img: any, i: number) => (
                  <Image
                    key={i}
                    src={img.url}
                    alt={`${name} ${i + 1}`}
                    width={80}
                    height={60}
                    style={{ borderRadius: "6px", objectFit: "cover", cursor: "pointer" }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div style={{ flex: "1 1 400px" }}>
            {product.brand?.name && (
              <span className="gtc-tag" style={{ marginBottom: "12px", display: "inline-block" }}>
                {product.brand.name}
              </span>
            )}
            <h2 style={{ marginBottom: "16px" }}>{name}</h2>
            <p style={{ lineHeight: 1.7, color: "var(--color-text-secondary)", marginBottom: "24px" }}>
              {shortDesc}
            </p>

            {/* Specifications Table */}
            {specs.length > 0 && (
              <table className="gtc-spec-table">
                <thead>
                  <tr>
                    <th>{dict.products?.specName || "Specification"}</th>
                    <th>{dict.products?.specValue || "Value"}</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((spec: any, i: number) => (
                    <tr key={i}>
                      <td>{spec.key?.[lang] || spec.key?.ka || spec.key}</td>
                      <td>{spec.value?.[lang] || spec.value?.ka || spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Documents */}
            {documents.length > 0 && (
              <div style={{ marginTop: "24px" }}>
                <h4 style={{ marginBottom: "12px" }}>{dict.products?.documents || "Documents"}</h4>
                {documents.map((doc: any, i: number) => (
                  <a
                    key={i}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gtc-btn gtc-btn--ghost gtc-btn--sm"
                    style={{ marginRight: "8px", marginBottom: "8px" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    {doc.name || `Document ${i + 1}`}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Full Description */}
      {description && (
        <section className="gtc-section gtc-section--alt">
          <div className="gtc-container" style={{ maxWidth: "800px" }}>
            <h3 style={{ marginBottom: "16px" }}>{dict.products?.fullDescription || "Description"}</h3>
            {description.split("\n").map((p: string, i: number) => (
              <p key={i} style={{ lineHeight: 1.7, marginBottom: "12px", color: "var(--color-text-secondary)" }}>
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <section className="gtc-section">
          <div className="gtc-container">
            <h3 style={{ marginBottom: "24px" }}>{dict.products?.related || "Related Products"}</h3>
            <div className="gtc-grid gtc-grid--4">
              {related.map((rp: any) => (
                <ProductCard
                  key={rp.id}
                  slug={rp.slug}
                  name={rp.name?.[lang] || rp.name?.ka || ""}
                  categoryName={categoryName}
                  image={rp.images?.[0]?.url || null}
                  locale={lang}
                  dict={{ viewDetails: dict.common?.viewDetails || "View Details" }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
