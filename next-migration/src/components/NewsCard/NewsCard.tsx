import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { LocaleType } from "@/types/gtc-locale.type";

interface Props {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  category: string;
  publishedAt: string;
  locale: LocaleType;
  dict: {
    readMore: string;
    categoryLabels: Record<string, string>;
  };
}

/** Safely format a date — guards against null/invalid (fixes Jan 1970 bug) */
function formatDate(dateStr: string, locale: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime()) || d.getFullYear() < 2000) return "";

  const langMap: Record<string, string> = {
    ka: "ka-GE",
    en: "en-US",
    ru: "ru-RU",
  };

  return d.toLocaleDateString(langMap[locale] || "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const NewsCard: FC<Props> = ({
  slug,
  title,
  excerpt,
  coverImage,
  category,
  publishedAt,
  locale,
  dict,
}) => {
  const dateStr = formatDate(publishedAt, locale);
  const categoryLabel = dict.categoryLabels[category] || category;

  return (
    <article className="gtc-card">
      <div className="gtc-card__image-wrap">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="gtc-card__image"
          />
        ) : (
          <div className="gtc-card__image-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
        )}
        <span className="gtc-tag">{categoryLabel}</span>
      </div>
      <div className="gtc-card__body">
        {dateStr && <time className="gtc-card__date">{dateStr}</time>}
        <h3 className="gtc-card__title">{title}</h3>
        <p className="gtc-card__excerpt">{excerpt}</p>
        <Link
          href={`/${locale}/news/${slug}`}
          className="gtc-btn gtc-btn--ghost gtc-btn--sm"
        >
          {dict.readMore}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
