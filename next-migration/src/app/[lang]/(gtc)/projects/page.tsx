import { getDictionary } from "@/app/dictionaries/dictionaries";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import { getProjects } from "@/lib/data/gtc-queries";
import type { ProjectCategory } from "@/interfaces/project.interface";
import type { Metadata } from "next";

const PROJECT_CATEGORIES: ProjectCategory[] = [
  "residential",
  "commercial",
  "infrastructure",
  "industrial",
];

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as any;
  return {
    title: dict.meta?.projects || "Projects",
    description: dict.projects?.intro || "",
  };
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const { lang } = await params;
  const search = await searchParams;
  const dict = (await getDictionary(lang)) as any;

  const page = parseInt(search?.page || "1", 10);
  const category = (search?.category as ProjectCategory) || undefined;

  const result = await getProjects({
    category,
    page,
    pageSize: 9,
  });
  const projects = result.projects;
  const totalPages = Math.ceil((result.total || 0) / 9);

  return (
    <>
      <section className="gtc-page-hero">
        <div className="gtc-container">
          <Breadcrumb
            items={[{ label: dict.nav?.projects || "Projects" }]}
            homeLabel={dict.nav?.home || "Home"}
            locale={lang}
          />
          <h1 className="gtc-page-hero__title">{dict.projects?.title || "Our Projects"}</h1>
          <p className="gtc-page-hero__subtitle">{dict.projects?.intro || ""}</p>
        </div>
      </section>

      <section className="gtc-section">
        <div className="gtc-container">
          {/* Category Filter */}
          <div className="gtc-filter-bar">
            <Link
              href={`/${lang}/projects`}
              className={`gtc-filter-bar__item ${!category ? "gtc-filter-bar__item--active" : ""}`}
            >
              {dict.common?.all || "All"}
            </Link>
            {PROJECT_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/${lang}/projects?category=${cat}`}
                className={`gtc-filter-bar__item ${category === cat ? "gtc-filter-bar__item--active" : ""}`}
              >
                {dict.projects?.categories?.[cat] || cat}
              </Link>
            ))}
          </div>

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <div className="gtc-grid gtc-grid--3">
              {projects.map((project: any) => (
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
          ) : (
            <p style={{ textAlign: "center", padding: "48px 0", color: "var(--color-text-muted)" }}>
              {dict.projects?.noResults || "No projects found."}
            </p>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl={`/${lang}/projects${category ? `?category=${category}` : ""}`}
            dict={{
              previous: dict.common?.pagination?.previous || "Previous",
              next: dict.common?.pagination?.next || "Next",
            }}
          />
        </div>
      </section>
    </>
  );
}
