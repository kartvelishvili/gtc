import Link from "next/link";
import { FC, ReactElement } from "react";
import { LocaleType } from "@/types/gtc-locale.type";
import { ServiceSlug } from "@/interfaces/service.interface";

/* Icon mapping for each service */
const serviceIcons: Record<ServiceSlug, ReactElement> = {
  engineering: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 20h20" />
      <path d="M5 20V8l7-5 7 5v12" />
      <path d="M9 20v-6h6v6" />
      <path d="M9 12h6" />
    </svg>
  ),
  consulting: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  ),
  rental: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <path d="M12 12v4" />
      <path d="M2 12h20" />
    </svg>
  ),
  optimization: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
};

interface Props {
  slug: ServiceSlug;
  name: string;
  shortDescription: string;
  benefits?: string[];
  locale: LocaleType;
  dict: {
    learnMore: string;
  };
}

const ServiceCard: FC<Props> = ({
  slug,
  name,
  shortDescription,
  benefits,
  locale,
  dict,
}) => {
  return (
    <article className="gtc-service-card">
      <div className="gtc-service-card__icon">
        {serviceIcons[slug]}
      </div>
      <h3 className="gtc-service-card__title">{name}</h3>
      <p className="gtc-service-card__desc">{shortDescription}</p>

      {benefits && benefits.length > 0 && (
        <ul className="gtc-service-card__benefits">
          {benefits.slice(0, 3).map((benefit, i) => (
            <li key={i}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent, #e8b554)" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>
      )}

      <Link
        href={`/${locale}/services/${slug}`}
        className="gtc-btn gtc-btn--ghost gtc-btn--sm"
      >
        {dict.learnMore}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </Link>
    </article>
  );
};

export default ServiceCard;
