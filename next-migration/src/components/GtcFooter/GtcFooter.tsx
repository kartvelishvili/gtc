import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { LocaleType } from "@/types/gtc-locale.type";

/* ── Types ───────────────────────────────────────── */
interface Props {
  dict: {
    site: { name: string };
    nav: Record<string, string>;
    footer: {
      description: string;
      quickLinks: string;
      services: string;
      contactInfo: string;
      address: string;
      phone: string;
      email: string;
      rights: string;
    };
    services: {
      engineering: { name: string };
      consulting: { name: string };
      rental: { name: string };
      optimization: { name: string };
    };
  };
  locale: LocaleType;
}

/* ── Component ───────────────────────────────────── */
const GtcFooter: FC<Props> = ({ dict, locale }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: dict.nav.about, href: `/${locale}/about-us` },
    { label: dict.nav.doka, href: `/${locale}/doka` },
    { label: dict.nav.products, href: `/${locale}/products` },
    { label: dict.nav.projects, href: `/${locale}/projects` },
    { label: dict.nav.news, href: `/${locale}/news` },
    { label: dict.nav.contact, href: `/${locale}/contact-us` },
  ];

  const serviceLinks = [
    { label: dict.services.engineering.name, href: `/${locale}/services/engineering` },
    { label: dict.services.consulting.name, href: `/${locale}/services/consulting` },
    { label: dict.services.rental.name, href: `/${locale}/services/rental` },
    { label: dict.services.optimization.name, href: `/${locale}/services/optimization` },
  ];

  return (
    <footer className="gtc-footer">
      <div className="gtc-container">
        {/* ── Main grid ── */}
        <div className="gtc-footer__grid">
          {/* Column 1: Brand */}
          <div className="gtc-footer__brand">
            <Link href={`/${locale}`} className="gtc-footer__logo">
              <Image
                src="/icons/gtc-logo.svg"
                alt={dict.site.name}
                width={40}
                height={40}
              />
              <span className="gtc-footer__logo-text">{dict.site.name}</span>
            </Link>
            <p className="gtc-footer__desc">{dict.footer.description}</p>

            {/* Social icons */}
            <div className="gtc-footer__social">
              <a
                href="https://www.facebook.com/GTCGroupGeorgia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/gtcgroup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="gtc-footer__col">
            <h4 className="gtc-footer__heading">{dict.footer.quickLinks}</h4>
            <ul className="gtc-footer__list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="gtc-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="gtc-footer__col">
            <h4 className="gtc-footer__heading">{dict.footer.services}</h4>
            <ul className="gtc-footer__list">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="gtc-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="gtc-footer__col">
            <h4 className="gtc-footer__heading">{dict.footer.contactInfo}</h4>
            <address className="gtc-footer__contact">
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {dict.footer.address}
              </p>
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <a href="tel:+995322470747">{dict.footer.phone}</a>
              </p>
              <p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:info@gtcgroup.ge">{dict.footer.email}</a>
              </p>
            </address>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="gtc-footer__bottom">
          <p>&copy; {currentYear} {dict.site.name}. {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default GtcFooter;
