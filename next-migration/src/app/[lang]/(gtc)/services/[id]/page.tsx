import { getDictionary } from "@/app/dictionaries/dictionaries";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { getService } from "@/lib/data/gtc-queries";
import { notFound } from "next/navigation";
import type { Locale } from "@/interfaces/localized-text.interface";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { lang, id } = await params;
  const l = lang as Locale;
  const service = await getService(id);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.name?.[l] || service.name?.ka || "Service",
    description: service.shortDescription?.[l] || service.shortDescription?.ka || "",
  };
}

export default async function ServiceDetailPage({ params }: { params: any }) {
  const { lang, id } = await params;
  const l = lang as Locale;
  const dict = (await getDictionary(lang)) as any;
  const service = await getService(id);

  if (!service) notFound();

  const name = service.name?.[l] || service.name?.ka || "";
  const description = service.description?.[l] || service.description?.ka || "";
  const benefits = (service.benefits || []).map((b) => b[l] || b.ka);

  return (
    <>
      <section className="gtc-page-hero">
        <div className="gtc-container">
          <Breadcrumb
            items={[
              { label: dict.nav?.services || "Services", href: `/${lang}/services` },
              { label: name },
            ]}
            homeLabel={dict.nav?.home || "Home"}
            locale={lang}
          />
          <h1 className="gtc-page-hero__title">{name}</h1>
        </div>
      </section>

      <section className="gtc-section">
        <div className="gtc-container" style={{ maxWidth: "800px" }}>
          <div
            className="gtc-prose"
            style={{ lineHeight: 1.8, color: "var(--color-text-secondary)" }}
          >
            {description.split("\n").map((paragraph: string, i: number) => (
              <p key={i} style={{ marginBottom: "16px" }}>{paragraph}</p>
            ))}
          </div>

          {benefits.length > 0 && (
            <div style={{ marginTop: "40px" }}>
              <h3 style={{ marginBottom: "20px", color: "var(--color-text-primary)" }}>
                {dict.services?.benefitsTitle || "Key Benefits"}
              </h3>
              <ul className="gtc-service-card__benefits" style={{ listStyle: "none", padding: 0 }}>
                {benefits.filter(Boolean).map((benefit, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
