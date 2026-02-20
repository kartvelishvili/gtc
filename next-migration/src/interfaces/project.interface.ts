import { IFile } from "@/interfaces/file.interface";
import { ILocalizedText } from "@/interfaces/localized-text.interface";
import { IGtcProduct } from "@/interfaces/gtc-product.interface";
import { IService } from "@/interfaces/service.interface";

export type ProjectCategory =
  | "residential"
  | "commercial"
  | "infrastructure"
  | "stadium"
  | "industrial"
  | "other";

export interface IProject {
  id: number;
  slug: string;
  name: ILocalizedText;
  description?: ILocalizedText;
  shortDescription?: ILocalizedText;
  client?: ILocalizedText;
  contractor?: ILocalizedText;
  location?: ILocalizedText;
  category: ProjectCategory;
  startDate?: string | null;
  endDate?: string | null;
  image?: IFile;
  images: IFile[];
  usedProducts: IGtcProduct[];
  usedServices: IService[];
  isFeatured: boolean;
  metaTitle?: ILocalizedText;
  metaDescription?: ILocalizedText;
  createdAt: string;
}
