"use server";

import { createContactSubmission } from "@/lib/data/gtc-queries";
import { z } from "zod";

const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "tooShort")
    .max(50, "tooLong"),
  lastName: z
    .string()
    .min(2, "tooShort")
    .max(50, "tooLong"),
  email: z
    .string()
    .email("invalidEmail"),
  phone: z
    .string()
    .max(20, "tooLong")
    .optional()
    .default(""),
  subject: z
    .string()
    .max(200, "tooLong")
    .optional()
    .default(""),
  message: z
    .string()
    .min(10, "tooShort")
    .max(5000, "tooLong"),
});

export type ContactFormState = {
  ok: boolean;
  errors?: Record<string, string>;
  message?: string;
};

export async function submitContactFormAction(
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }
): Promise<ContactFormState> {
  try {
    // Validate input
    const parsed = contactFormSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      }
      return { ok: false, errors: fieldErrors };
    }

    // Submit to database
    const result = await createContactSubmission(parsed.data);

    if (!result) {
      return {
        ok: false,
        message: "error",
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("submitContactFormAction error:", error);
    return {
      ok: false,
      message: "error",
    };
  }
}
