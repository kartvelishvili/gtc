import { IFile, ILocalizedText } from "@/interfaces/localized-text.interface";

export type ServiceSlug = "engineering" | "consulting" | "rental" | "optimization";

export interface IService {
  id: number;
  slug: ServiceSlug;
  name: ILocalizedText;
  shortDescription?: ILocalizedText;
  description?: ILocalizedText;
  icon: string;
  image?: IFile;
  benefits: ILocalizedText[];
  sortOrder: number;
  metaTitle?: ILocalizedText;
  metaDescription?: ILocalizedText;
}
