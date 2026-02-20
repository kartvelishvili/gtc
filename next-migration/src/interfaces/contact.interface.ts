export interface IContactSubmission {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}
