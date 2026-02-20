import { IFile } from "@/interfaces/file.interface";
import { ILocalizedText } from "@/interfaces/localized-text.interface";
import { IBrand } from "@/interfaces/brand.interface";
import { IProductCategory } from "@/interfaces/product-category.interface";

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
