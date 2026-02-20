import { getDictionary } from "@/app/dictionaries/dictionaries";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import { getServices } from "@/lib/data/gtc-queries";
import type { ServiceSlug } from "@/interfaces/service.interface";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as any;
  return {
    title: dict.meta?.services || "Services",
    description: dict.services?.intro || "",
  };
}

export default async function ServicesPage({ params }: { params: any }) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as any;
  const services = await getServices();

  return (
    <>
      <section className="gtc-page-hero">
        <div className="gtc-container">
          <Breadcrumb
            items={[{ label: dict.nav?.services || "Services" }]}
            homeLabel={dict.nav?.home || "Home"}
            locale={lang}
          />
          <h1 className="gtc-page-hero__title">{dict.services?.title || "Our Services"}</h1>
          <p className="gtc-page-hero__subtitle">{dict.services?.intro || ""}</p>
        </div>
      </section>

      <section className="gtc-section">
        <div className="gtc-container">
          <div className="gtc-grid gtc-grid--2">
            {services.map((service: any) => (
              <ServiceCard
                key={service.id}
                slug={service.slug as ServiceSlug}
                name={service.name?.[lang] || service.name?.ka || ""}
                shortDescription={service.shortDescription?.[lang] || service.shortDescription?.ka || ""}
                benefits={(service.benefits?.[lang] || service.benefits?.ka || []).slice(0, 4)}
                locale={lang}
                dict={{ learnMore: dict.common?.learnMore || "Learn More" }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
