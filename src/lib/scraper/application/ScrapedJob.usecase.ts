import { ScraperRepositoryPort } from "../domain/ScraperRepository.port";

export class ScrapedJobUseCase {
  constructor (private readonly repo: ScraperRepositoryPort) {}

  async execute (url: string) {
    await this.repo.scrape(url)
  }
}
