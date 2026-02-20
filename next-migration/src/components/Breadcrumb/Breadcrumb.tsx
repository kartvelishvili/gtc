import Link from "next/link";
import { FC, Fragment } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
  homeLabel?: string;
  locale: string;
}

const Breadcrumb: FC<Props> = ({ items, homeLabel = "Home", locale }) => {
  const allItems: BreadcrumbItem[] = [
    { label: homeLabel, href: `/${locale}` },
    ...items,
  ];

  return (
    <nav className="gtc-breadcrumb" aria-label="Breadcrumb">
      <ol className="gtc-breadcrumb__list">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <Fragment key={index}>
              <li className="gtc-breadcrumb__item">
                {item.href && !isLast ? (
                  <Link href={item.href} className="gtc-breadcrumb__link">
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="gtc-breadcrumb__current"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li className="gtc-breadcrumb__separator" aria-hidden>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
