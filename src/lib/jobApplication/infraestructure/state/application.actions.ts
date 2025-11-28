import { atom } from "jotai";
import { Application } from "../../domain/JobApplication.schema";
import { applicationState, newApplicationFormAtom } from "./application.atom";
import applicationDI from "../../di";
import { RESET } from "jotai/utils";
import { isFormValidAtom } from "./application.selectors";

const getApplicationUseCase = applicationDI.get(
  "GetApplicationUseCase"
);

const saveApplicationUseCase = applicationDI.get('SaveApplicationUseCase')
const removeApplicationUseCase = applicationDI.get('RemoveApplicationUseCase')

if (!getApplicationUseCase || !saveApplicationUseCase || !removeApplicationUseCase) {
  console.error("CRITICAL DI ERROR: One or more Application Use Cases are undefined.");
    throw new Error("Application module is not configured correctly.");
}

export const loadJobApplicationsAtom = atom(
  null,
  async (_, set) => {
    set(applicationState, prev => ({...prev, status: 'loading', error: null}))

    try {
      const data = await getApplicationUseCase.execute();
      set(applicationState, prev => ({ ...prev, list: data, status: "success", error: null }));
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred.";
      set(applicationState, prev => ({ ...prev, status: "error", error: errorMessage }));
    }
  }
)

// Átomo de solo escritura para guardar/actualizar (UPSERT) una postulación
export const saveJobApplicationAtom = atom(
  null,
  async (get, set) => {
    const jobApps = get(applicationState).list;

    const isValid = get(isFormValidAtom)
    if (!isValid) {
      console.warn("Validation failed. Cannot save application.");
      return
    }

    const applicationData = get(newApplicationFormAtom)
    set(applicationState, (prev) => ({
      ...prev,
      status: "loading",
      error: null,
    }));

    try {
      await saveApplicationUseCase.execute(applicationData)
      console.log("Saving application:", applicationData);

      set(applicationState, (prevState) => {
        const isUpdate = jobApps.some((app) => app.id === applicationData.id);
        const newList: Application[] = isUpdate
          ? jobApps.map((app) => (app.id === applicationData.id ? applicationData : app))
          : [...prevState.list, applicationData];
        return { ...prevState, list: newList, status: "success" };
      });
      set(resetApplicationFormAction);
      console.log("Application saved successfully.");
    } catch (e) {
      console.error("Failed to save application:", e);
      set(applicationState, (prev) => ({
        ...prev,
        status: "error",
        error: e.message || "Error al guardar la postulación.",
      }));
    }
  }
);

export const deleteApplicationAtom = atom(null, async (_, set, id: string) => {
  set(applicationState, (prev) => ({
    ...prev,
    status: "deleting",
    error: null,
  }));
  try {
    await removeApplicationUseCase.execute(id)

    set(applicationState, (prev) => ({
      ...prev,
      list: prev.list.filter((jobApp) => jobApp.id !== id),
      status: "success",
    }));
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Failed to remove application.";
    set(applicationState, (prev) => ({
      ...prev,
      status: "error",
      error: errorMessage,
    }));
    throw new Error(errorMessage);
  }
});

// export const moveJob = atom(null, async (get, set, { id, status }) => {
//   const jobs = get(jobsAtom);
//   const jobToUpdate = jobs.find(job => job.id === id)
//   if (!jobToUpdate) return

  // validación para restringir los movimientos
  // const currentStatus = jobToUpdate.status
  // const newStatus = status

  // const validStatusTransitions: Record<JobStatusEnum, JobStatusEnum[]> = {
  //   [JobStatusEnum.APPLIED]: [JobStatusEnum.APPLIED, JobStatusEnum.HIRED, JobStatusEnum.INTERVIEW, JobStatusEnum.REJECTED],
  //   [JobStatusEnum.INTERVIEW]: [JobStatusEnum.INTERVIEW, JobStatusEnum.HIRED, JobStatusEnum.REJECTED],
  //   [JobStatusEnum.HIRED]: [],
  //   [JobStatusEnum.REJECTED]: []
  // }

  // const allowedTransitions = validStatusTransitions[currentStatus];

  // if (!allowedTransitions.includes(newStatus)) {
  //   throw new Error(`Transición de '${currentStatus}' a '${newStatus}' no es válida.`);
  // }

  // validacion cuando el estatus es contratado o rechazado
  // if (newStatus === JobStatusEnum.HIRED) {}

  // if (newStatus === JobStatusEnum.REJECTED) {}


  // const updatedJob = {
  //   ...jobToUpdate
  // }
  // await repo.save(jobToUpdate)
//   const updatedJobs = jobs.map(job => job.id === id ? jobToUpdate : job)
//   set(jobsAtom, updatedJobs)
// });
export const updateApplicationFieldAction = atom(
  null,
  (_, set, {name, value}: {name: keyof Application, value: Application[keyof Application]}) => {
    set(newApplicationFormAtom, prev => ({
      ...prev,
      [name]: value
    }))
  }
)

export const resetApplicationFormAction = atom(
  null,
  (_, set) => set(newApplicationFormAtom, RESET))
