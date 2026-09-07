import { supabase } from "@/integrations/supabase/client";

export type AnalyticsEvent =
  | "contact_form_impression"
  | "contact_form_submit_attempt"
  | "contact_form_validation_error"
  | "enquiry_submitted";

export async function trackEvent(
  event: AnalyticsEvent,
  metadata: Record<string, unknown> = {},
): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const { error } = await supabase.from("analytics_events").insert({
      event_name: event,
      path: window.location.pathname,
      metadata: metadata as never,
    });
    if (error) console.warn(`[analytics] ${event} not recorded: ${error.message}`);
  } catch (cause) {
    console.warn(`[analytics] ${event} failed`, cause);
  }
}
