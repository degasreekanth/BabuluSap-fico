import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string;
  status: string;
  created_at: string;
};

export type AdminEnquiriesResult =
  | { ok: false; reason: "not_admin" }
  | {
      ok: true;
      inquiries: Inquiry[];
      stats: { impressions: number; submissions: number; conversionRate: number };
    };

export const getAdminEnquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminEnquiriesResult> => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });

    if (roleError) {
      console.error(`[admin] role check failed for ${context.userId}: ${roleError.message}`);
      throw new Error("Could not verify your access level. Please sign in again.");
    }

    if (!isAdmin) {
      console.warn(`[admin] non-admin user ${context.userId} attempted to read enquiries`);
      return { ok: false, reason: "not_admin" };
    }

    const [inquiriesRes, eventsRes] = await Promise.all([
      context.supabase
        .from("contact_inquiries")
        .select("id,name,email,phone,company,service,message,status,created_at")
        .order("created_at", { ascending: false })
        .limit(500),
      context.supabase.from("analytics_events").select("event_name").limit(5000),
    ]);

    if (inquiriesRes.error) {
      console.error(`[admin] enquiry read failed: ${inquiriesRes.error.message}`);
      throw new Error("Could not load enquiries. Please try again.");
    }
    if (eventsRes.error) {
      console.error(`[admin] analytics read failed: ${eventsRes.error.message}`);
    }

    const events = eventsRes.data ?? [];
    const impressions = events.filter((e) => e.event_name === "contact_form_impression").length;
    const submissions = events.filter((e) => e.event_name === "enquiry_submitted").length;

    return {
      ok: true,
      inquiries: (inquiriesRes.data ?? []) as Inquiry[],
      stats: {
        impressions,
        submissions,
        conversionRate: impressions > 0 ? Math.round((submissions / impressions) * 1000) / 10 : 0,
      },
    };
  });
