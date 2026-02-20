import { IFile } from "@/interfaces/file.interface";

export interface IBrand {
  id: number;
  name: string;
  slug: string;
  logo?: IFile;
  websiteUrl?: string;
  isPartner: boolean;
  sortOrder: number;
}
