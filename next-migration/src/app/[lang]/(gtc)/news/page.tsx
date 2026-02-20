import { getDictionary } from "@/app/dictionaries/dictionaries";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import NewsCard from "@/components/NewsCard/NewsCard";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import { getNews } from "@/lib/data/gtc-queries";
import type { Metadata } from "next";

const NEWS_CATEGORIES = ["company", "project", "industry", "event"] as const;

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as any;
  return {
    title: dict.meta?.news || "News",
    description: dict.news?.intro || "",
  };
}

export default async function NewsPage({
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
  const category = search?.category || undefined;

  const result = await getNews({ category, page, pageSize: 9 });
  const news = result.news;
  const totalPages = Math.ceil((result.total || 0) / 9);

  return (
    <>
      <section className="gtc-page-hero">
        <div className="gtc-container">
          <Breadcrumb
            items={[{ label: dict.nav?.news || "News" }]}
            homeLabel={dict.nav?.home || "Home"}
            locale={lang}
          />
          <h1 className="gtc-page-hero__title">{dict.news?.title || "News"}</h1>
        </div>
      </section>

      <section className="gtc-section">
        <div className="gtc-container">
          {/* Category Filter */}
          <div className="gtc-filter-bar">
            <Link
              href={`/${lang}/news`}
              className={`gtc-filter-bar__item ${!category ? "gtc-filter-bar__item--active" : ""}`}
            >
              {dict.common?.all || "All"}
            </Link>
            {NEWS_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/${lang}/news?category=${cat}`}
                className={`gtc-filter-bar__item ${category === cat ? "gtc-filter-bar__item--active" : ""}`}
              >
                {dict.news?.categories?.[cat] || cat}
              </Link>
            ))}
          </div>

          {news.length > 0 ? (
            <div className="gtc-grid gtc-grid--3">
              {news.map((item: any) => (
                <NewsCard
                  key={item.id}
                  slug={item.slug}
                  title={item.title?.[lang] || item.title?.ka || ""}
                  excerpt={item.excerpt?.[lang] || item.excerpt?.ka || ""}
                  coverImage={item.coverImage}
                  category={item.category}
                  publishedAt={item.publishedAt}
                  locale={lang}
                  dict={{
                    readMore: dict.common?.readMore || "Read More",
                    categoryLabels: dict.news?.categories || {},
                  }}
                />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", padding: "48px 0", color: "var(--color-text-muted)" }}>
              {dict.news?.noResults || "No news articles found."}
            </p>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl={`/${lang}/news${category ? `?category=${category}` : ""}`}
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
