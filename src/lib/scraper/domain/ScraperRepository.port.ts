
export interface ScraperRepositoryPort {
  scrape: (url: string) => Promise<void>
}
