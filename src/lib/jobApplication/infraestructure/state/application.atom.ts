import { atom } from "jotai";
import { JobApplication, JobApplicationStatusEnum,  } from "../../domain/JobApplication.schema";
import { atomWithReset } from "jotai/utils";

type ApplicationState = {
  list: JobApplication[]
  status: 'idle' | 'loading' | 'success' | 'deleting' | 'error',
  error: string | null
}

export const applicationState = atom<ApplicationState>({
  list: [],
  status: 'idle',
  error: null
})

export const selectedJobApplicationAtom = atom<JobApplication | null>(null);

// Atomo para saber si estamos en modo lectura o edición para la postulación
export const isEditingAtom = atom(false);

// Atomo para controlar el formulario para crear una nueva postulación
export const newApplicationFormAtom = atomWithReset<JobApplication>({
  id: "",
  company: "",
  position: "",
  status: JobApplicationStatusEnum.Draft,
  notes: [],
  metrics: "",
  appliedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
});

