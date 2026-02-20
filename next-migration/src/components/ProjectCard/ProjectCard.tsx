import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { LocaleType } from "@/types/gtc-locale.type";
import { ProjectCategory } from "@/interfaces/project.interface";

interface Props {
  slug: string;
  title: string;
  coverImage: string | null;
  category: ProjectCategory;
  client: string;
  location?: string;
  locale: LocaleType;
  dict: {
    viewProject: string;
    categories: Record<string, string>;
  };
}

const ProjectCard: FC<Props> = ({
  slug,
  title,
  coverImage,
  category,
  client,
  location,
  locale,
  dict,
}) => {
  return (
    <article className="gtc-project-card">
      <div className="gtc-project-card__image-wrap">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="gtc-project-card__image"
          />
        ) : (
          <div className="gtc-card__image-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
        )}
        <div className="gtc-project-card__overlay">
          <span className="gtc-tag">{dict.categories[category] || category}</span>
          <h3 className="gtc-project-card__title">{title}</h3>
          <p className="gtc-project-card__meta">
            {client}
            {location && ` · ${location}`}
          </p>
          <Link
            href={`/${locale}/projects/${slug}`}
            className="gtc-btn gtc-btn--outline-light gtc-btn--sm"
          >
            {dict.viewProject}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
