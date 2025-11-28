import { Job } from "../../../lib/scraper/domain/job.entity";

export function reorderJob({jobs, startIndex, endIndex}: {jobs: Job[], startIndex: number, endIndex: number}) {
  const result = Array.from(jobs)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}
