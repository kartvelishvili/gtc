import { getDictionary } from "@/app/dictionaries/dictionaries";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import StatCounter from "@/components/StatCounter/StatCounter";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import NewsCard from "@/components/NewsCard/NewsCard";
import Link from "next/link";
import Image from "next/image";
import { getHeroSlides, getServices, getProjects, getNews } from "@/lib/data/gtc-queries";
import type { ServiceSlug } from "@/interfaces/service.interface";
import type { ProjectCategory } from "@/interfaces/project.interface";

export default async function HomePage({ params }: { params: any }) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as any;

  // Parallel data fetching
  const [heroSlides, services, projectsResult, newsResult] = await Promise.all([
    getHeroSlides(),
    getServices(),
    getProjects({ isFeatured: true, pageSize: 3 }),
    getNews({ pageSize: 3 }),
  ]);

  const featuredProjects = projectsResult.projects;
  const latestNews = newsResult.news;

  // Map hero slides to component format
  const slides = heroSlides.map((s: any) => ({
    id: s.id,
    title: s.title?.[lang] || s.title?.ka || "",
    subtitle: s.subtitle?.[lang] || s.subtitle?.ka || "",
    ctaText: s.ctaText?.[lang] || s.ctaText?.ka || "",
    ctaUrl: s.ctaUrl || `/${lang}/contact-us`,
    imageUrl: s.imageUrl || "/images/hero-default.jpg",
    videoUrl: s.videoUrl || undefined,
  }));

  // Fallback hero if no slides in DB
  const fallbackSlides = slides.length > 0 ? slides : [{
    id: "fallback",
    title: dict.site?.name || "GTC Group",
    subtitle: dict.site?.tagline || "",
    ctaText: dict.hero?.cta?.contact || dict.nav?.contact || "Contact Us",
    ctaUrl: `/${lang}/contact-us`,
    imageUrl: "/images/hero-default.jpg",
  }];

  return (
    <>
      {/* ── Hero Section ── */}
      <HeroSlider slides={fallbackSlides} />

      {/* ── Stats Bar ── */}
      <section className="gtc-section gtc-section--dark">
        <div className="gtc-container">
          <StatCounter
            stats={[
              { value: 15, suffix: "+", label: dict.stats?.experience || "Years Experience" },
              { value: 200, suffix: "+", label: dict.stats?.projects || "Projects" },
              { value: 50, suffix: "+", label: dict.stats?.partners || "Partners" },
              { value: 100, suffix: "%", label: dict.stats?.quality || "Quality" },
            ]}
          />
        </div>
      </section>

      {/* ── Services Section ── */}
      <section className="gtc-section">
        <div className="gtc-container">
          <div className="gtc-section__header">
            <h2 className="gtc-section__title">
              {dict.sections?.ourServices || "Our Services"}
            </h2>
            <p className="gtc-section__subtitle">
              {dict.sections?.ourServicesSubtitle || ""}
            </p>
          </div>
          <div className="gtc-grid gtc-grid--4">
            {services.map((service: any) => (
              <ServiceCard
                key={service.id}
                slug={service.slug as ServiceSlug}
                name={service.name?.[lang] || service.name?.ka || ""}
                shortDescription={service.shortDescription?.[lang] || service.shortDescription?.ka || ""}
                benefits={(service.benefits?.[lang] || service.benefits?.ka || []).slice(0, 3)}
                locale={lang}
                dict={{ learnMore: dict.common?.learnMore || "Learn More" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── DOKA Partnership Banner ── */}
      <section className="gtc-cta-banner">
        <div className="gtc-container" style={{ display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px" }}>
            <h2 className="gtc-section__title" style={{ color: "#fff" }}>
              {dict.doka?.title || "DOKA — Official Partner"}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "24px" }}>
              {dict.doka?.shortDescription || ""}
            </p>
            <Link href={`/${lang}/doka`} className="gtc-btn gtc-btn--primary">
              {dict.common?.learnMore || "Learn More"}
            </Link>
          </div>
          <div style={{ flex: "0 0 200px", textAlign: "center" }}>
            <Image
              src="/images/doka-logo.png"
              alt="DOKA"
              width={180}
              height={80}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="gtc-section">
        <div className="gtc-container">
          <div className="gtc-section__header">
            <h2 className="gtc-section__title">
              {dict.sections?.featuredProjects || "Featured Projects"}
            </h2>
            <Link href={`/${lang}/projects`} className="gtc-btn gtc-btn--ghost">
              {dict.common?.viewAll || "View All"}
            </Link>
          </div>
          <div className="gtc-grid gtc-grid--3">
            {featuredProjects.map((project: any) => (
              <ProjectCard
                key={project.id}
                slug={project.slug}
                title={project.title?.[lang] || project.title?.ka || ""}
                coverImage={project.coverImage}
                category={project.category as ProjectCategory}
                client={project.client?.[lang] || project.client?.ka || ""}
                location={project.location?.[lang] || project.location?.ka || ""}
                locale={lang}
                dict={{
                  viewProject: dict.common?.viewProject || "View Project",
                  categories: dict.projects?.categories || {},
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest News ── */}
      <section className="gtc-section gtc-section--alt">
        <div className="gtc-container">
          <div className="gtc-section__header">
            <h2 className="gtc-section__title">
              {dict.sections?.latestNews || "Latest News"}
            </h2>
            <Link href={`/${lang}/news`} className="gtc-btn gtc-btn--ghost">
              {dict.common?.viewAll || "View All"}
            </Link>
          </div>
          <div className="gtc-grid gtc-grid--3">
            {latestNews.map((news: any) => (
              <NewsCard
                key={news.id}
                slug={news.slug}
                title={news.title?.[lang] || news.title?.ka || ""}
                excerpt={news.excerpt?.[lang] || news.excerpt?.ka || ""}
                coverImage={news.coverImage}
                category={news.category}
                publishedAt={news.publishedAt}
                locale={lang}
                dict={{
                  readMore: dict.common?.readMore || "Read More",
                  categoryLabels: dict.news?.categories || {},
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="gtc-cta-banner">
        <div className="gtc-container" style={{ textAlign: "center" }}>
          <h2 className="gtc-section__title" style={{ color: "#fff" }}>
            {dict.contact?.ctaTitle || "Ready to Start Your Project?"}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "600px", margin: "0 auto 24px" }}>
            {dict.contact?.ctaSubtitle || ""}
          </p>
          <Link href={`/${lang}/contact-us`} className="gtc-btn gtc-btn--primary gtc-btn--lg">
            {dict.nav?.contact || "Contact Us"}
          </Link>
        </div>
      </section>
    </>
  );
}
