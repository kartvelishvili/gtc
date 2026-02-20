import { getDictionary } from "@/app/dictionaries/dictionaries";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import StatCounter from "@/components/StatCounter/StatCounter";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as any;
  return {
    title: dict.meta?.about || "About Us",
    description: dict.about?.intro || "",
  };
}

export default async function AboutPage({ params }: { params: any }) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as any;

  return (
    <>
      {/* Page Hero */}
      <section className="gtc-page-hero">
        <div className="gtc-container">
          <Breadcrumb
            items={[{ label: dict.nav?.about || "About" }]}
            homeLabel={dict.nav?.home || "Home"}
            locale={lang}
          />
          <h1 className="gtc-page-hero__title">{dict.about?.title || "About GTC Group"}</h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="gtc-section">
        <div className="gtc-container" style={{ display: "flex", gap: "48px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: "1 1 500px" }}>
            <h2 className="gtc-section__title">{dict.about?.whoWeAre || "Who We Are"}</h2>
            <p style={{ lineHeight: 1.8, color: "var(--color-text-secondary)" }}>
              {dict.about?.intro || ""}
            </p>
          </div>
          <div style={{ flex: "1 1 400px" }}>
            <Image
              src="/images/about-team.jpg"
              alt="GTC Group Team"
              width={600}
              height={400}
              style={{ borderRadius: "12px", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="gtc-section gtc-section--dark">
        <div className="gtc-container">
          <StatCounter
            stats={[
              { value: 15, suffix: "+", label: dict.stats?.experience || "Years" },
              { value: 200, suffix: "+", label: dict.stats?.projects || "Projects" },
              { value: 50, suffix: "+", label: dict.stats?.partners || "Partners" },
              { value: 100, suffix: "%", label: dict.stats?.quality || "Quality" },
            ]}
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="gtc-section">
        <div className="gtc-container">
          <div className="gtc-grid gtc-grid--2">
            <div className="gtc-card" style={{ padding: "32px" }}>
              <h3 style={{ color: "var(--color-accent)", marginBottom: "16px" }}>
                {dict.about?.missionTitle || "Our Mission"}
              </h3>
              <p style={{ lineHeight: 1.7 }}>{dict.about?.mission || ""}</p>
            </div>
            <div className="gtc-card" style={{ padding: "32px" }}>
              <h3 style={{ color: "var(--color-accent)", marginBottom: "16px" }}>
                {dict.about?.visionTitle || "Our Vision"}
              </h3>
              <p style={{ lineHeight: 1.7 }}>{dict.about?.vision || ""}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="gtc-section gtc-section--alt">
        <div className="gtc-container">
          <h2 className="gtc-section__title" style={{ textAlign: "center", marginBottom: "40px" }}>
            {dict.about?.valuesTitle || "Our Values"}
          </h2>
          <div className="gtc-grid gtc-grid--3">
            {(dict.about?.values || []).map((value: any, i: number) => (
              <div key={i} className="gtc-card" style={{ padding: "24px", textAlign: "center" }}>
                <h4 style={{ color: "var(--color-accent)", marginBottom: "8px" }}>{value.title}</h4>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
