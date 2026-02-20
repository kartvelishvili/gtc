import { getDictionary } from "@/app/dictionaries/dictionaries";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Image from "next/image";
import { getNewsItem } from "@/lib/data/gtc-queries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/interfaces/localized-text.interface";

/** Guard against null / epoch dates (Jan 1970 fix) */
function safeDateFormat(dateStr: string | null, lang: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime()) || d.getFullYear() < 2000) return "";
  const localeMap: Record<string, string> = { ka: "ka-GE", en: "en-US", ru: "ru-RU" };
  return d.toLocaleDateString(localeMap[lang] || "en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { lang, id } = await params;
  const l = lang as Locale;
  const news = await getNewsItem(id);
  if (!news) return { title: "Not Found" };
  return {
    title: news.title?.[l] || news.title?.ka || "News",
    description: news.shortDescription?.[l] || news.shortDescription?.ka || "",
  };
}

export default async function NewsDetailPage({ params }: { params: any }) {
  const { lang, id } = await params;
  const dict = (await getDictionary(lang)) as any;
  const news = await getNewsItem(id);

  if (!news) notFound();

  const l = lang as Locale;
  const title = news.title?.[l] || news.title?.ka || "";
  const content = news.description?.[l] || news.description?.ka || "";
  const excerpt = news.shortDescription?.[l] || news.shortDescription?.ka || "";
  const date = safeDateFormat(news.publishedAt ?? null, lang);
  const categoryLabel = dict.news?.categories?.[news.category] || news.category;

  return (
    <>
      <section className="gtc-page-hero">
        <div className="gtc-container">
          <Breadcrumb
            items={[
              { label: dict.nav?.news || "News", href: `/${lang}/news` },
              { label: title },
            ]}
            homeLabel={dict.nav?.home || "Home"}
            locale={lang}
          />
          <h1 className="gtc-page-hero__title">{title}</h1>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: "12px" }}>
            {date && <time style={{ fontSize: "0.875rem", opacity: 0.7 }}>{date}</time>}
            <span className="gtc-tag">{categoryLabel}</span>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {news.image?.url && (
        <section>
          <div className="gtc-container" style={{ maxWidth: "900px" }}>
            <Image
              src={news.image.url}
              alt={title}
              width={900}
              height={500}
              style={{ width: "100%", height: "auto", borderRadius: "12px" }}
              priority
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="gtc-section">
        <div className="gtc-container" style={{ maxWidth: "800px" }}>
          {excerpt && (
            <p style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              fontWeight: 500,
              marginBottom: "32px",
              color: "var(--color-text-primary)",
            }}>
              {excerpt}
            </p>
          )}
          <div className="gtc-prose">
            {content.split("\n").map((paragraph: string, i: number) => (
              <p key={i} style={{ lineHeight: 1.8, marginBottom: "16px", color: "var(--color-text-secondary)" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
