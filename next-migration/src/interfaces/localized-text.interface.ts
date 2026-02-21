export type Locale = "ka" | "en" | "ru";

export interface ILocalizedText {
  ka?: string;
  en?: string;
  ru?: string;
}

export interface IFile {
  id?: number;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface IBrand {
  id: number;
  slug: string;
  name: ILocalizedText;
  logo?: IFile;
}

export interface IProductCategory {
  id: number;
  slug: string;
  name: ILocalizedText;
  description?: ILocalizedText;
  image?: IFile;
  sortOrder: number;
}
