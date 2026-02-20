import { IFile } from "@/interfaces/file.interface";
import { ILocalizedText } from "@/interfaces/localized-text.interface";

export type NewsCategory =
  | "company"
  | "products"
  | "projects"
  | "events"
  | "other";

export interface INews {
  id: number;
  slug: string;
  title: ILocalizedText;
  description?: ILocalizedText;
  shortDescription?: ILocalizedText;
  category: NewsCategory;
  image?: IFile;
  images: IFile[];
  isFeatured: boolean;
  publishedAt?: string | null;
  metaTitle?: ILocalizedText;
  metaDescription?: ILocalizedText;
  createdAt: string;
}
