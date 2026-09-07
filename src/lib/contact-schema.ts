import { z } from "zod";

export const interests = [
  "Free Demo Class",
  "Course Details & Fees",
  "Batch Timings",
  "Placement Assistance",
  "Doubt / General Inquiry",
] as const;

export const modes = ["Online (Live)", "Offline / Classroom", "Hybrid"] as const;

const nameRegex = /^[a-zA-Z][a-zA-Z\s.'-]*$/;
const phoneRegex = /^[0-9]{7,15}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name (at least 2 characters)." })
    .max(80, { message: "Name must be 80 characters or fewer." })
    .regex(nameRegex, { message: "Name can only contain letters, spaces, apostrophes, dots and hyphens." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email address is required." })
    .email({ message: "Enter a valid email address, e.g. you@email.com." })
    .max(254, { message: "Email must be 254 characters or fewer." }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Phone / WhatsApp number is required." })
    .transform((value) => value.replace(/[\s()+-]/g, ""))
    .refine((value) => phoneRegex.test(value), {
      message: "Enter a valid phone number with 7 to 15 digits.",
    }),
  interest: z
    .string()
    .trim()
    .max(60)
    .refine((value) => value === "" || (interests as readonly string[]).includes(value), {
      message: "Please choose one of the listed interests.",
    })
    .optional()
    .default(""),
  mode: z
    .string()
    .trim()
    .max(60)
    .refine((value) => value === "" || (modes as readonly string[]).includes(value), {
      message: "Please choose one of the listed training modes.",
    })
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .max(1000, { message: "Message must be 1000 characters or fewer." })
    .optional()
    .default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactValues = z.output<typeof contactSchema>;
export type FieldErrors = Partial<Record<keyof ContactValues, string>>;

export function validateContact(raw: unknown):
  | { ok: true; data: ContactValues }
  | { ok: false; fieldErrors: FieldErrors; message: string } {
  const parsed = contactSchema.safeParse(raw);
  if (parsed.success) return { ok: true, data: parsed.data };

  const fieldErrors: FieldErrors = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0] as keyof ContactValues | undefined;
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  const first = Object.values(fieldErrors)[0] ?? "Please check the highlighted fields.";
  return { ok: false, fieldErrors, message: first };
}
