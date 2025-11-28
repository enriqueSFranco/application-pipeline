import { z } from "zod";
import { NoteSchema } from "../../notes/domain/note.schema";

/**
JobApplication
  - id
  - company
  - position
  - status
  - createdAt
  - updatedAt
  - reminderDates[]
  - notes[]
  - metrics (calculables, no persistidos)
 */

export enum JobApplicationStatusEnum {
  Draft = "draft", // creada pero no enviada aún
  Applied = "applied", // postulada (CV enviado)
  UnderReview = "under_review", // el reclutador está revisando
  InterviewScheduled = "interview_scheduled", // entrevista agendada
  Interviewing = "interviewing", // en proceso de entrevista
  Assessment = "assessment", // en pruebas técnicas o psicométricas
  Offer = "offer", // se hizo una oferta
  Accepted = "accepted", // oferta aceptada
  Rejected = "rejected", // rechazado por la empresa
  Withdrawn = "withdrawn", // el candidato se retiró del proceso
  Hired = "hired", // contratado
  Archived = "archived", // archivada o inactiva
}

export const StatusEnum = z.enum(JobApplicationStatusEnum);

export const JobApplicationSchema = z.object({
  id: z.uuidv4(),
  company: z.string(),
  position: z.string(),
  status: StatusEnum,
  notes: z.array(NoteSchema).min(0).max(50, "No puedes tener más de 50 notas"),
  metrics: z.string(),
  appliedAt: z
    .preprocess((value) => {
      if (typeof value === "string") {
        return new Date(value);
      }
      return value;
    }, z.date())
    .refine((date) => date <= new Date(), {
      message: "La fecha de postulación no puede ser en el futuro.",
    })
    .refine(
      (date) => {
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
        return date >= fiveYearsAgo;
      },
      {
        message: "La fecha de postulación es demasiado antigua.",
      }
    ),
  createdAt: z.preprocess((value) => {
    if (typeof value === "string") {
      return new Date(value);
    }
    return value;
  }, z.date()),
  updatedAt: z.preprocess((value) => {
    if (typeof value === "string") {
      return new Date(value);
    }
    return value;
  }, z.date()),
});

export type JobApplication = z.infer<typeof JobApplicationSchema>;
