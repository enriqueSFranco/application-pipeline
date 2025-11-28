import { JobRepository } from "../domain/ScraperRepository.port";
import { Job } from "../domain/Scraper.schema";

export const createJobService = (repository: JobRepository) => ({
  getAll: async () => {
    const jobs = await repository.getAll()
    return jobs
  },
  findById: async (id: string) => repository.findById(id),
  findByStatus: async (status) =>  repository.findByStatus(status),
  save: async (job: Job) => {
   return repository.save({...job})
  },
  remove: async (id: string) => {
   return repository.remove(id)
  }
})
