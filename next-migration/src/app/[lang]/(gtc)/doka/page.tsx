import { getDictionary } from "@/app/dictionaries/dictionaries";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as any;
  return {
    title: dict.meta?.doka || "DOKA Partnership",
    description: dict.doka?.intro || "",
  };
}

export default async function DokaPage({ params }: { params: any }) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as any;

  const dokaAdvantages = dict.doka?.advantages || [];

  return (
    <>
      {/* Page Hero */}
      <section className="gtc-page-hero">
        <div className="gtc-container">
          <Breadcrumb
            items={[{ label: dict.nav?.doka || "DOKA" }]}
            homeLabel={dict.nav?.home || "Home"}
            locale={lang}
          />
          <h1 className="gtc-page-hero__title">{dict.doka?.title || "DOKA Partnership"}</h1>
        </div>
      </section>

      {/* Intro with DOKA Logo */}
      <section className="gtc-section">
        <div className="gtc-container" style={{ display: "flex", gap: "48px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: "1 1 500px" }}>
            <h2 className="gtc-section__title">{dict.doka?.subtitle || "Official DOKA Partner in Georgia"}</h2>
            <p style={{ lineHeight: 1.8, color: "var(--color-text-secondary)", marginBottom: "24px" }}>
              {dict.doka?.intro || ""}
            </p>
            <p style={{ lineHeight: 1.8, color: "var(--color-text-secondary)" }}>
              {dict.doka?.description || ""}
            </p>
          </div>
          <div style={{ flex: "0 0 280px", textAlign: "center", padding: "32px", background: "#fff", borderRadius: "12px" }}>
            <Image
              src="/images/doka-logo.png"
              alt="DOKA"
              width={240}
              height={120}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </section>

      {/* DOKA Advantages */}
      <section className="gtc-section gtc-section--alt">
        <div className="gtc-container">
          <h2 className="gtc-section__title" style={{ textAlign: "center", marginBottom: "40px" }}>
            {dict.doka?.advantagesTitle || "Why DOKA?"}
          </h2>
          <div className="gtc-grid gtc-grid--3">
            {dokaAdvantages.map((adv: any, i: number) => (
              <div key={i} className="gtc-card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-accent)", marginBottom: "12px" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 style={{ marginBottom: "8px" }}>{adv.title}</h3>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gtc-cta-banner">
        <div className="gtc-container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#fff", marginBottom: "16px" }}>
            {dict.doka?.ctaTitle || "Want to learn more about DOKA solutions?"}
          </h2>
          <Link href={`/${lang}/contact-us`} className="gtc-btn gtc-btn--primary gtc-btn--lg">
            {dict.nav?.contact || "Contact Us"}
          </Link>
        </div>
      </section>
    </>
  );
}
