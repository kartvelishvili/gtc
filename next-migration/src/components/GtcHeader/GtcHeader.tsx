"use client";

import Link from "next/link";
import Image from "next/image";
import { FC, useEffect, useState, useCallback } from "react";
import { LocaleType } from "@/types/gtc-locale.type";

/* ── Types ───────────────────────────────────────── */
interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface Props {
  dict: {
    nav: {
      home: string;
      about: string;
      doka: string;
      services: string;
      products: string;
      projects: string;
      news: string;
      contact: string;
    };
    site: {
      name: string;
    };
  };
  locale: LocaleType;
}

/* ── Component ───────────────────────────────────── */
const GtcHeader: FC<Props> = ({ dict, locale }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  /* Scroll handler — make header solid after 80px */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Close mobile on route change or resize */
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  useEffect(() => {
    window.addEventListener("resize", closeMobile);
    return () => window.removeEventListener("resize", closeMobile);
  }, [closeMobile]);

  const navItems: NavItem[] = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.about, href: `/${locale}/about-us` },
    { label: dict.nav.doka, href: `/${locale}/doka` },
    { label: dict.nav.services, href: `/${locale}/services` },
    { label: dict.nav.products, href: `/${locale}/products` },
    { label: dict.nav.projects, href: `/${locale}/projects` },
    { label: dict.nav.news, href: `/${locale}/news` },
    { label: dict.nav.contact, href: `/${locale}/contact-us` },
  ];

  const locales: { code: LocaleType; label: string }[] = [
    { code: "ka", label: "GE" },
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
  ];

  return (
    <>
      {/* Skip to main content (a11y) */}
      <a href="#main-content" className="gtc-skip-nav">
        Skip to content
      </a>

      <header
        className={`gtc-header ${scrolled ? "gtc-header--solid" : "gtc-header--transparent"}`}
      >
        <div className="gtc-container gtc-header__inner">
          {/* ── Logo ── */}
          <Link href={`/${locale}`} className="gtc-header__logo" onClick={closeMobile}>
            <Image
              src="/icons/gtc-logo.svg"
              alt={dict.site.name}
              width={48}
              height={48}
              priority
            />
            <span className="gtc-header__logo-text">{dict.site.name}</span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="gtc-header__nav" aria-label="Main navigation">
            <ul className="gtc-header__nav-list">
              {navItems.map((item) => (
                <li
                  key={item.href}
                  className="gtc-header__nav-item"
                  onMouseEnter={() => item.children && setActiveDropdown(item.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href={item.href} className="gtc-header__nav-link">
                    {item.label}
                    {item.children && (
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && activeDropdown === item.href && (
                    <ul className="gtc-header__dropdown">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="gtc-header__dropdown-link">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Language Switcher ── */}
          <div className="gtc-header__actions">
            <div className="gtc-lang-switcher">
              {locales.map((l) => (
                <Link
                  key={l.code}
                  href={`/${l.code}`}
                  className={`gtc-lang-switcher__link ${l.code === locale ? "gtc-lang-switcher__link--active" : ""}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* ── Mobile Toggle ── */}
            <button
              className="gtc-header__burger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className={`gtc-header__burger-line ${mobileOpen ? "gtc-header__burger-line--open" : ""}`} />
              <span className={`gtc-header__burger-line ${mobileOpen ? "gtc-header__burger-line--open" : ""}`} />
              <span className={`gtc-header__burger-line ${mobileOpen ? "gtc-header__burger-line--open" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Overlay ── */}
      {mobileOpen && (
        <div className="gtc-mobile-menu" role="dialog" aria-modal="true">
          <nav aria-label="Mobile navigation">
            <ul className="gtc-mobile-menu__list">
              {navItems.map((item) => (
                <li key={item.href} className="gtc-mobile-menu__item">
                  <Link
                    href={item.href}
                    className="gtc-mobile-menu__link"
                    onClick={closeMobile}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile language switcher */}
          <div className="gtc-mobile-menu__lang">
            {locales.map((l) => (
              <Link
                key={l.code}
                href={`/${l.code}`}
                className={`gtc-lang-switcher__link ${l.code === locale ? "gtc-lang-switcher__link--active" : ""}`}
                onClick={closeMobile}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GtcHeader;
