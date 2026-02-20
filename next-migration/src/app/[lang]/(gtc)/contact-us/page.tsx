import { getDictionary } from "@/app/dictionaries/dictionaries";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ContactForm from "@/components/ContactForm/ContactForm";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as any;
  return {
    title: dict.meta?.contact || "Contact Us",
    description: dict.contact?.intro || "",
  };
}

export default async function ContactPage({ params }: { params: any }) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as any;

  return (
    <>
      <section className="gtc-page-hero">
        <div className="gtc-container">
          <Breadcrumb
            items={[{ label: dict.nav?.contact || "Contact" }]}
            homeLabel={dict.nav?.home || "Home"}
            locale={lang}
          />
          <h1 className="gtc-page-hero__title">{dict.contact?.title || "Contact Us"}</h1>
        </div>
      </section>

      <section className="gtc-section">
        <div className="gtc-container">
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            {/* Contact Form */}
            <div style={{ flex: "1 1 500px" }}>
              <h2 style={{ marginBottom: "8px" }}>{dict.contact?.formTitle || "Send us a message"}</h2>
              <p style={{ color: "var(--color-text-secondary)", marginBottom: "32px" }}>
                {dict.contact?.formSubtitle || "Fill out the form and we'll get back to you shortly."}
              </p>
              <ContactForm dict={dict.contact} />
            </div>

            {/* Contact Info Sidebar */}
            <div style={{ flex: "0 1 360px" }}>
              <div className="gtc-card" style={{ padding: "32px" }}>
                <h3 style={{ marginBottom: "24px" }}>{dict.contact?.infoTitle || "Contact Info"}</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Address */}
                  <div style={{ display: "flex", gap: "12px" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: "4px" }}>{dict.contact?.addressLabel || "Address"}</p>
                      <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                        {dict.footer?.address || "Tbilisi, Georgia"}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div style={{ display: "flex", gap: "12px" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: "4px" }}>{dict.contact?.phoneLabel || "Phone"}</p>
                      <a href="tel:+995322470747" style={{ fontSize: "0.875rem", color: "var(--color-accent)" }}>
                        +995 (32) 247-07-47
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ display: "flex", gap: "12px" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: "4px" }}>{dict.contact?.emailLabel || "Email"}</p>
                      <a href="mailto:info@gtcgroup.ge" style={{ fontSize: "0.875rem", color: "var(--color-accent)" }}>
                        info@gtcgroup.ge
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div style={{ display: "flex", gap: "12px" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: "4px" }}>{dict.contact?.hoursLabel || "Working Hours"}</p>
                      <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                        {dict.contact?.hours || "Mon-Fri: 09:00 - 18:00"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="gtc-section" style={{ paddingTop: 0 }}>
        <div className="gtc-container">
          <div style={{
            width: "100%",
            height: "400px",
            borderRadius: "12px",
            overflow: "hidden",
            background: "var(--color-bg-secondary)",
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.5!2d44.78!3d41.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQzJzEyLjAiTiA0NMKwNDYnNDguMCJF!5e0!3m2!1sen!2sge!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GTC Group Office Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
