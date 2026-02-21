import { IFile, ILocalizedText, IBrand, IProductCategory } from "@/interfaces/localized-text.interface";

export interface IProductSpecification {
  key: string;
  value: string;
}

export interface IProductDocument {
  id: number;
  title: ILocalizedText;
  file: IFile;
  sortOrder: number;
}

export interface IGtcProduct {
  id: number;
  slug: string;
  name: ILocalizedText;
  description?: ILocalizedText;
  shortDescription?: ILocalizedText;
  specifications: IProductSpecification[];
  image?: IFile;
  images: IFile[];
  documents: IProductDocument[];
  category: IProductCategory;
  brand?: IBrand;
  isFeatured: boolean;
  metaTitle?: ILocalizedText;
  metaDescription?: ILocalizedText;
  createdAt: string;
}
