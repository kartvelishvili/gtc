"use client";

import { useState } from "react";
import { submitContactFormAction, ContactFormState } from "@/lib/actions/contact-gtc";

interface ContactFormProps {
  dict: {
    form: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
    validation: {
      required: string;
      invalidEmail: string;
      tooShort: string;
      tooLong: string;
    };
  };
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [state, setState] = useState<ContactFormState | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validationMessages: Record<string, string> = {
    required: dict.validation.required,
    invalidEmail: dict.validation.invalidEmail,
    tooShort: dict.validation.tooShort,
    tooLong: dict.validation.tooLong,
  };

  function validate(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = "required";
    if (!formData.lastName.trim()) errors.lastName = "required";
    if (!formData.email.trim()) {
      errors.email = "required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "invalidEmail";
    }
    if (!formData.message.trim()) {
      errors.message = "required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "tooShort";
    }
    return errors;
  }

  const clientErrors = validate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      message: true,
    });

    // Client-side validation
    if (Object.keys(clientErrors).length > 0) {
      return;
    }

    setLoading(true);
    setState(null);

    try {
      const result = await submitContactFormAction(formData);
      setState(result);

      if (result.ok) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTouched({});
      }
    } catch {
      setState({ ok: false, message: "error" });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (state) setState(null); // Clear server state on edit
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  function getFieldError(field: string): string | undefined {
    // Server errors take priority
    if (state?.errors?.[field]) {
      return validationMessages[state.errors[field]] ?? state.errors[field];
    }
    // Client errors only shown after touch
    if (touched[field] && clientErrors[field]) {
      return validationMessages[clientErrors[field]] ?? clientErrors[field];
    }
    return undefined;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Success Message */}
      {state?.ok && (
        <div className="gtc-alert gtc-alert--success" role="alert">
          {dict.form.success}
        </div>
      )}

      {/* Server Error Message */}
      {state && !state.ok && state.message && (
        <div className="gtc-alert gtc-alert--error" role="alert">
          {dict.form.error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-lg)" }}>
        {/* First Name */}
        <div className="gtc-form-group">
          <label htmlFor="firstName" className="gtc-label">
            {dict.form.firstName} *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`gtc-input ${getFieldError("firstName") ? "gtc-input--error" : ""}`}
            required
            autoComplete="given-name"
          />
          {getFieldError("firstName") && (
            <p className="gtc-form-error">{getFieldError("firstName")}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="gtc-form-group">
          <label htmlFor="lastName" className="gtc-label">
            {dict.form.lastName} *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`gtc-input ${getFieldError("lastName") ? "gtc-input--error" : ""}`}
            required
            autoComplete="family-name"
          />
          {getFieldError("lastName") && (
            <p className="gtc-form-error">{getFieldError("lastName")}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="gtc-form-group">
        <label htmlFor="email" className="gtc-label">
          {dict.form.email} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`gtc-input ${getFieldError("email") ? "gtc-input--error" : ""}`}
          required
          autoComplete="email"
        />
        {getFieldError("email") && (
          <p className="gtc-form-error">{getFieldError("email")}</p>
        )}
      </div>

      {/* Phone */}
      <div className="gtc-form-group">
        <label htmlFor="phone" className="gtc-label">
          {dict.form.phone}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="gtc-input"
          autoComplete="tel"
        />
      </div>

      {/* Subject */}
      <div className="gtc-form-group">
        <label htmlFor="subject" className="gtc-label">
          {dict.form.subject}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="gtc-input"
        />
      </div>

      {/* Message */}
      <div className="gtc-form-group">
        <label htmlFor="message" className="gtc-label">
          {dict.form.message} *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`gtc-textarea ${getFieldError("message") ? "gtc-textarea--error" : ""}`}
          required
          rows={5}
        />
        {getFieldError("message") && (
          <p className="gtc-form-error">{getFieldError("message")}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="gtc-btn gtc-btn--primary"
        disabled={loading}
      >
        {loading ? dict.form.sending : dict.form.send}
      </button>
    </form>
  );
}
