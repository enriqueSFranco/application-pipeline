import { ScraperRepositoryPort } from "../../domain/ScraperRepository.port";
import { jobService } from "../../../../sections/Job/services/job.service";

export const createLocalStorageJobRepository = (): ScraperRepositoryPort => ({
 async scrape(url: string) {
  // TODO: La url debe ser un value-object
  try {
    const data = await jobService.scrapeJob(url)
    return data
  } catch (e) {
    throw new Error(`Error: ${e}`)
  }
}
});
