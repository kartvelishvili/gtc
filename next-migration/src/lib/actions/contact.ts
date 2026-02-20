"use server";

import { createContactUs } from "@/lib/data/queries";

export async function submitContactForm(formData: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  text: string;
}) {
  const result = await createContactUs(formData);
  return { ok: !!result, data: result };
}
