import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { validateContact, type FieldErrors } from "./contact-schema";

type SubmitResult = { ok: true } | { ok: false; message: string; fieldErrors: FieldErrors };

export const submitInquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => data)
  .handler(async ({ data }): Promise<SubmitResult> => {
    const result = validateContact(data);
    if (!result.ok) {
      return { ok: false, message: result.message, fieldErrors: result.fieldErrors };
    }

    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) {
      console.error("[contact] Missing SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY");
      return {
        ok: false,
        message: "Our enquiry service is temporarily unavailable. Please call +91 98850 76704.",
        fieldErrors: {},
      };
    }

    const supabase = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });

    const values = result.data;
    const { error } = await supabase.from("contact_inquiries").insert({
      name: values.name,
      email: values.email,
      phone: values.phone,
      company: values.mode || null,
      service: values.interest || null,
      message: values.message || "No additional message",
    });

    if (error) {
      console.error(`[contact] Insert failed: ${error.code ?? "unknown"} ${error.message}`);
      return {
        ok: false,
        message:
          "We couldn't save your enquiry right now. Please try again or call +91 98850 76704.",
        fieldErrors: {},
      };
    }

    return { ok: true };
  });
