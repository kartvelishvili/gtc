import { IFile } from "@/interfaces/file.interface";
import { ILocalizedText } from "@/interfaces/localized-text.interface";

export interface IProductCategory {
  id: number;
  slug: string;
  name: ILocalizedText;
  description?: ILocalizedText;
  image?: IFile;
  sortOrder: number;
  productCount?: number;
}
