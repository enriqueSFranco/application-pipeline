import { Application } from "../../domain/JobApplication.schema";
import { ApplicationRepositoryPort } from "../../domain/JobApplicationRepository.port";

export class GetApplicationsUseCase {
  constructor(private readonly repo: ApplicationRepositoryPort) { }

    async execute(): Promise<Application[]> {
      return await this.repo.findAll()
    }
}
