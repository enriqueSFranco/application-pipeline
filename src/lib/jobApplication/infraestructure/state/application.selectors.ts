import { atom } from "jotai";
import { applicationState, newApplicationFormAtom } from "./application.atom";
import { STATUS_TO_GROUP } from "../../../../sections/job-application/config/applicationViewConfig";
import { JobApplication, JobApplicationSchema } from "../../domain/JobApplication.schema";

export const applicationsList = atom((get) => get(applicationState).list);
export const applicationStatus = atom((get) => get(applicationState).status);
export const applicationError = atom((get) => get(applicationState).error);
export const applicationsCount = atom(
  (get) => get(applicationState).list.length
);

export const applicationsByGroupedByStatus = atom((get) => {
  const list = get(applicationState).list;
  const grouped: Record<"Todo" | "InProgress" | "Done", JobApplication[]> = {
    Todo: [],
    InProgress: [],
    Done: [],
  };

  list.forEach((app) => {
    const group = Object.entries(STATUS_TO_GROUP).find(([, statuses]) =>
      statuses.includes(app.status)
    )?.[0]

    if (group) {
      grouped[group as keyof typeof grouped].push(app)
    }
  });
  return grouped
});

type FieldError = Record<string, string[]>;
// Selector para extraer los errores de validación del formulario
export const formErrorsAtom = atom((get) => {
  const values = get(newApplicationFormAtom);

  const result = JobApplicationSchema.safeParse(values);
  if (!result.success) {
    const fieldErrors: FieldError = {};
    for (const issue of result.error.issues) {
      const fieldName = issue.path.join(".") as string;
      if (!fieldErrors[fieldName]) {
        fieldErrors[fieldName] = [];
      }
      fieldErrors[fieldName].push(issue.message);
    }
    return fieldErrors;
  }
  return {};
});

// Selector para saber si el formulario es válido (simple booleano)
export const isFormValidAtom = atom((get) => {
  return Object.entries(get(formErrorsAtom)).length === 0;
});

// Selector para exponer el objeto final de postulación
export const currentApplicationAtom = atom((get) => {
  return get(newApplicationFormAtom);
});
