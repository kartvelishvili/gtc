import { getDictionary } from "@/app/dictionaries/dictionaries";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Image from "next/image";
import { getProject } from "@/lib/data/gtc-queries";
import { notFound } from "next/navigation";
import type { Locale } from "@/interfaces/localized-text.interface";
import type { Metadata } from "next";

/** Guard against null / epoch dates (Jan 1970 fix) */
function safeDateFormat(dateStr: string | null | undefined, lang: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime()) || d.getFullYear() < 2000) return "—";
  const localeMap: Record<string, string> = { ka: "ka-GE", en: "en-US", ru: "ru-RU" };
  return d.toLocaleDateString(localeMap[lang] || "en", { year: "numeric", month: "long" });
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { lang, id } = await params;
  const l = lang as Locale;
  const project = await getProject(id);
  if (!project) return { title: "Not Found" };
  return {
    title: project.name?.[l] || project.name?.ka || "Project",
    description: project.description?.[l] || project.description?.ka || "",
  };
}

export default async function ProjectDetailPage({ params }: { params: any }) {
  const { lang, id } = await params;
  const l = lang as Locale;
  const dict = (await getDictionary(lang)) as any;
  const project = await getProject(id);

  if (!project) notFound();

  const title = project.name?.[l] || project.name?.ka || "";
  const description = project.description?.[l] || project.description?.ka || "";
  const client = project.client?.[l] || project.client?.ka || "";
  const location = project.location?.[l] || project.location?.ka || "";
  const images = project.images || [];

  return (
    <>
      <section className="gtc-page-hero">
        <div className="gtc-container">
          <Breadcrumb
            items={[
              { label: dict.nav?.projects || "Projects", href: `/${lang}/projects` },
              { label: title },
            ]}
            homeLabel={dict.nav?.home || "Home"}
            locale={lang}
          />
          <h1 className="gtc-page-hero__title">{title}</h1>
        </div>
      </section>

      {/* Cover Image */}
      {project.image?.url && (
        <section style={{ marginTop: "-20px" }}>
          <div className="gtc-container">
            <Image
              src={project.image.url}
              alt={title}
              width={1200}
              height={600}
              style={{ width: "100%", height: "auto", borderRadius: "12px" }}
              priority
            />
          </div>
        </section>
      )}

      {/* Project Info Cards */}
      <section className="gtc-section">
        <div className="gtc-container">
          <div className="gtc-grid gtc-grid--4" style={{ marginBottom: "48px" }}>
            <div className="gtc-card" style={{ padding: "20px", textAlign: "center" }}>
              <p style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.6 }}>
                {dict.projects?.client || "Client"}
              </p>
              <p style={{ fontWeight: 600 }}>{client || "—"}</p>
            </div>
            <div className="gtc-card" style={{ padding: "20px", textAlign: "center" }}>
              <p style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.6 }}>
                {dict.projects?.location || "Location"}
              </p>
              <p style={{ fontWeight: 600 }}>{location || "—"}</p>
            </div>
            <div className="gtc-card" style={{ padding: "20px", textAlign: "center" }}>
              <p style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.6 }}>
                {dict.projects?.startDate || "Start Date"}
              </p>
              <p style={{ fontWeight: 600 }}>{safeDateFormat(project.startDate, lang)}</p>
            </div>
            <div className="gtc-card" style={{ padding: "20px", textAlign: "center" }}>
              <p style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.6 }}>
                {dict.projects?.endDate || "End Date"}
              </p>
              <p style={{ fontWeight: 600 }}>{safeDateFormat(project.endDate, lang)}</p>
            </div>
          </div>

          {/* Description */}
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {description.split("\n").map((p: string, i: number) => (
              <p key={i} style={{ lineHeight: 1.8, marginBottom: "16px", color: "var(--color-text-secondary)" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {images.length > 0 && (
        <section className="gtc-section gtc-section--alt">
          <div className="gtc-container">
            <h3 style={{ marginBottom: "24px" }}>{dict.projects?.gallery || "Project Gallery"}</h3>
            <div className="gtc-grid gtc-grid--3">
              {images.map((img: any, i: number) => (
                <Image
                  key={i}
                  src={img.url}
                  alt={`${title} - ${i + 1}`}
                  width={400}
                  height={300}
                  style={{ width: "100%", height: "auto", borderRadius: "8px", objectFit: "cover" }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
