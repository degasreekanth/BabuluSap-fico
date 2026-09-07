import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { interests, modes, validateContact, type FieldErrors } from "@/lib/contact-schema";
import { trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";

type Status = "idle" | "submitting" | "success" | "error";

const PHONE = "9885076704";
const PHONE_INTL = "919885076704";
const EMAIL = "bpmrsapfico@gmail.com";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    phone: string;
  } | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const impressionSent = useRef(false);

  // Analytics: form impression (fires once when the form scrolls into view)
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !impressionSent.current) {
          impressionSent.current = true;
          void trackEvent("contact_form_impression");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const inputClass = (field: keyof FieldErrors) =>
    `w-full px-3 md:px-4 py-2.5 rounded-lg border outline-none transition-all text-slate-900 text-sm focus:ring-2 ${
      fieldErrors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-400/20"
        : "border-slate-300 focus:border-navy-500 focus:ring-navy-500/20"
    }`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setErrorMsg("");
    setFieldErrors({});
    void trackEvent("contact_form_submit_attempt");

    const fd = new FormData(form);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      interest: String(fd.get("interest") ?? ""),
      mode: String(fd.get("mode") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    // Client-side validation with the same schema the server uses
    const local = validateContact(raw);
    if (!local.ok) {
      setStatus("error");
      setFieldErrors(local.fieldErrors);
      setErrorMsg(local.message);
      void trackEvent("contact_form_validation_error", {
        fields: Object.keys(local.fieldErrors),
        source: "client",
      });
      return;
    }

    try {
      const values = local.data;
      const { error } = await supabase.from("contact_inquiries").insert({
        name: values.name,
        email: values.email,
        phone: values.phone,
        company: values.mode || null,
        service: values.interest || null,
        message: values.message || "No additional message",
      });
      if (error) throw error;
    } catch (cause) {
      console.error("[contact] submit failed", cause);
      setStatus("error");
      setErrorMsg(
        "We couldn't reach our servers. Please check your connection or call +91 98850 76704.",
      );
      return;
    }

    const values = local.data;
    void trackEvent("enquiry_submitted", {
      interest: values.interest || null,
      mode: values.mode || null,
    });

    const waText = `*New Enquiry \u2014 BPMR SAP FICO*%0A%0A*Name:* ${encodeURIComponent(
      values.name,
    )}%0A*Email:* ${encodeURIComponent(values.email)}%0A*Phone:* ${encodeURIComponent(
      values.phone,
    )}%0A*Interest:* ${encodeURIComponent(values.interest)}%0A*Mode:* ${encodeURIComponent(
      values.mode,
    )}%0A*Message:* ${encodeURIComponent(values.message || "N/A")}`;

    const mailSubject = encodeURIComponent(`New Enquiry from ${values.name} \u2014 BPMR SAP FICO`);
    const mailBody = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nInterest: ${values.interest}\nMode: ${values.mode}\n\nMessage: ${values.message || "N/A"}`,
    );

    setSubmittedData({ name: values.name, phone: values.phone });
    setStatus("success");
    form.reset();

    window.open(`https://wa.me/${PHONE_INTL}?text=${waText}`, "_blank", "noopener,noreferrer");

    window.open(`mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}`, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 md:py-24 bg-navy-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-hero-pattern opacity-60" />
      <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-navy-700/50 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-sm font-bold text-gold-400 uppercase tracking-widest">
            Enrol Today
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Start Your SAP FICO Journey <span className="text-gold-400">Today</span>
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gold-400" />
          <p className="mt-5 text-sm sm:text-base text-navy-300 leading-relaxed">
            Fill in the form and we'll forward your enquiry via WhatsApp and email instantly, or
            call us directly for an instant response.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start">
          {/* Info cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-5">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-4 p-5 md:p-6 rounded-2xl bg-gold-500 hover:bg-gold-400 transition-colors"
            >
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-navy-900/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-navy-900" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-navy-900/70 uppercase tracking-wider">
                  Call / WhatsApp
                </div>
                <div className="text-base md:text-lg font-bold text-navy-900 mt-0.5">
                  +91 98850 76704
                </div>
              </div>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-4 p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-gold-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-navy-400 uppercase tracking-wider">
                  Email
                </div>
                <div className="text-white font-semibold mt-0.5 text-sm md:text-base truncate">
                  {EMAIL}
                </div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 sm:col-span-2 lg:col-span-1">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-gold-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-navy-400 uppercase tracking-wider">
                  Training Mode
                </div>
                <div className="text-white font-semibold mt-0.5 text-sm md:text-base">
                  Online & Offline Available
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${PHONE_INTL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 md:p-6 rounded-2xl bg-green-500/10 border border-green-400/30 hover:bg-green-500/20 transition-colors sm:col-span-2 lg:col-span-1"
            >
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-green-400/70 uppercase tracking-wider">
                  WhatsApp Us
                </div>
                <div className="text-green-300 font-semibold mt-0.5 text-sm md:text-base">
                  Chat Instantly
                </div>
              </div>
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-10 md:py-14">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 md:w-8 md:h-8 text-green-500" />
                </div>
                <h3 className="mt-5 md:mt-6 text-lg md:text-xl font-bold text-navy-900">
                  Enquiry Sent Successfully!
                </h3>
                <p className="mt-3 text-slate-500 max-w-sm text-sm leading-relaxed">
                  Thank you, {submittedData?.name}! We've forwarded your enquiry via WhatsApp and
                  email. Our advisor will call you on <strong>{submittedData?.phone}</strong> within
                  a few hours.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/${PHONE_INTL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Open WhatsApp
                  </a>
                  <button
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                  >
                    Submit another enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <h3 className="text-lg md:text-xl font-bold text-navy-900 mb-1">
                  Request a Free Demo
                </h3>
                <p className="text-sm text-slate-500 mb-2">
                  Fill out the form and we'll forward your enquiry via WhatsApp and email instantly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-700 mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className={inputClass("name")}
                    />
                    {fieldErrors.name && (
                      <p className="mt-1.5 text-xs text-red-600">{fieldErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-slate-700 mb-1.5"
                    >
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className={inputClass("phone")}
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1.5 text-xs text-red-600">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    className={inputClass("email")}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label
                      htmlFor="interest"
                      className="block text-sm font-semibold text-slate-700 mb-1.5"
                    >
                      I'm Interested In
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      className="w-full px-3 md:px-4 py-2.5 rounded-lg border border-slate-300 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none transition-all text-slate-900 bg-white text-sm"
                    >
                      <option value="">Select an option...</option>
                      {interests.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="mode"
                      className="block text-sm font-semibold text-slate-700 mb-1.5"
                    >
                      Training Mode
                    </label>
                    <select
                      id="mode"
                      name="mode"
                      className="w-full px-3 md:px-4 py-2.5 rounded-lg border border-slate-300 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none transition-all text-slate-900 bg-white text-sm"
                    >
                      <option value="">Select mode...</option>
                      {modes.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700 mb-1.5"
                  >
                    Message / Question
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your background and what you're looking to achieve..."
                    className="w-full px-3 md:px-4 py-2.5 rounded-lg border border-slate-300 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none transition-all text-slate-900 resize-none text-sm"
                  />
                </div>

                {status === "error" && errorMsg && (
                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 md:px-6 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm md:text-base transition-colors shadow-lg"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Request Free Demo Class
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400">
                  Or call us directly:{" "}
                  <a href={`tel:${PHONE}`} className="text-gold-600 font-bold hover:underline">
                    +91 98850 76704
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
