import { IFile } from "@/interfaces/file.interface";
import { ILocalizedText } from "@/interfaces/localized-text.interface";

export interface IHeroSlide {
  id: number;
  title: ILocalizedText;
  subtitle?: ILocalizedText;
  ctaText?: ILocalizedText;
  ctaUrl?: string;
  image?: IFile;
  videoUrl?: string;
  sortOrder: number;
  isActive: boolean;
}
