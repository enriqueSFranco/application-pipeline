import { z } from "zod";

export const ScraperSchema = z.object({
  id: z.uuidv4(),
  url: z.preprocess((value) => {
    if (value instanceof URL) return value.toString().trim();
    if (typeof value === "string") return value.trim();
    return value;
  }, z.url()),
  title: z
    .string()
    .min(1, "El título es requerido.")
    .transform((value) => value.trim()),
  company: z
    .string()
    .min(1, "El nombre de la compañia es requerido")
    .transform((value) => value.trim().toUpperCase()),
  position: z.string(),
});

export type Scraper = z.infer<typeof ScraperSchema>;
