import { JobStatusEnum, Job } from "../domain/Job"

/**
 * @description Agrupa una lista de trabajos por su estado.
 * @param jobs La lista de trabajos a agrupar.
 * @returns Un objeto donde las claves son los estados y los valores son arrays de trabajos.
 */
export function groupByStatus(jobs: Job[]) {
  const grouped: Record<JobStatusEnum, Job[]> = {} as Record<JobStatusEnum, Job[]>

  for (const job of jobs) {
    if (!grouped[job.status]) {
      grouped[job.status] = []
    }
    grouped[job.status].push(job)
  }
  return grouped
}
