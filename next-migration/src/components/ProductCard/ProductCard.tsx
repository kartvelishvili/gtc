import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { LocaleType } from "@/types/gtc-locale.type";

interface Props {
  slug: string;
  name: string;
  categoryName: string;
  image: string | null;
  brandName?: string;
  locale: LocaleType;
  dict: {
    viewDetails: string;
  };
}

const ProductCard: FC<Props> = ({
  slug,
  name,
  categoryName,
  image,
  brandName,
  locale,
  dict,
}) => {
  return (
    <article className="gtc-card">
      <div className="gtc-card__image-wrap">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="gtc-card__image"
          />
        ) : (
          <div className="gtc-card__image-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        {brandName && <span className="gtc-tag">{brandName}</span>}
      </div>
      <div className="gtc-card__body">
        <p className="gtc-card__category">{categoryName}</p>
        <h3 className="gtc-card__title">{name}</h3>
        <Link
          href={`/${locale}/products/${slug}`}
          className="gtc-btn gtc-btn--ghost gtc-btn--sm"
        >
          {dict.viewDetails}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
