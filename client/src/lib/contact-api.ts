import { z } from "zod";

export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(1, "Message is required"),
});

export type InsertContactSubmission = z.infer<typeof insertContactSchema>;

const contactSubmissionSchema = insertContactSchema.extend({
  id: z.number(),
  uuid: z.string(),
  createdAt: z.string(),
});

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
};

export const api = {
  contact: {
    submit: {
      method: "POST" as const,
      path: "/api/contact",
      input: insertContactSchema,
      responses: {
        201: contactSubmissionSchema,
        400: errorSchemas.validation,
      },
    },
  },
};
