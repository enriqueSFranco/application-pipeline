import { JobStatusEnum, Job } from "../domain/Job";
import { NotFoundError } from "../domain/JobError";
import { JobRepository } from "../domain/JobRepository";
import mockData from "../../../mocks/jobs.json"
import { dateFnsAdapter } from "../../shared/infraestructure/dateFnsAdapter";

const STORAGE_KEY = "my-applications";

function loadJobs(): Job[] {
  try {
    const store = window.localStorage.getItem(STORAGE_KEY);
      const data: Job[] = store
        ? (JSON.parse(store) as Job[])
        : mockData;
      return data;
  } catch (error) {
    console.error("Failed to parse localStorage data", error);
    return [];
  }
}

function persistJobs(jobs: Job[]) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(jobs))
  } catch(error) {
    console.error("Failed to save jobs to localStorage", error);
    throw error;
  }
}

export const createLocalStorageJobRepository = (): JobRepository => ({
  getAll: async () => loadJobs(),
  findById: async (id: string): Promise<Job> => {
    const localMyApplications = loadJobs()
    const jobApplication = localMyApplications.find((job) => job.id === id);
    if (!jobApplication) throw new NotFoundError("Job", id)
    return jobApplication;
  },
  findByStatus: async (status: JobStatusEnum): Promise<Job[]> => {
    const localMyApplications = loadJobs()
    return localMyApplications.filter((job) =>
      job.status === status
    );
  },
  save: async (job: Job) => {
    const localMyApplications = loadJobs()
    const applicationIdx = localMyApplications.findIndex(
      (j) => j.id === job.id
    );
    const now = new Date() // NOTE: fecha de creación y de postulación
    const formattedDate = dateFnsAdapter.formatDate(now, "yyyy-MM-dd")
    const notFound = -1;
    if (applicationIdx === notFound) {
      // Case: Crear la postulación
      const newApplication: Job = {...job, appliedAt: formattedDate, updatedAt: formattedDate}
      persistJobs([...localMyApplications, newApplication])
      return newApplication
  } else {
    // Case: Actualización de la postulacion
    const updatedApplication = {...localMyApplications[applicationIdx], ...job, updatedAt: formattedDate}
    localMyApplications[applicationIdx] = updatedApplication
    persistJobs(localMyApplications)
    return updatedApplication
  }
},
  remove: async (id: string) => {
    const localMyApplications = loadJobs()
    const newApplications = localMyApplications.filter((job) => job.id !== id);
    if (newApplications.length === localMyApplications.length) {
      throw new NotFoundError("Job", id);
    }
    persistJobs(newApplications);
  },
});
