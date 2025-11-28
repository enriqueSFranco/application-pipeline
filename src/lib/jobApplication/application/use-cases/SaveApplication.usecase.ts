import { Application } from "../../domain/JobApplication.schema";
import { ApplicationRepositoryPort } from "../../domain/JobApplicationRepository.port";

export class SaveApplicationUseCase {
  constructor(private readonly repo: ApplicationRepositoryPort) {}

  async execute(jobApplication: Application) {
    await this.repo.save(jobApplication)
  }
}
