import { ApplicationRepositoryPort } from "../../domain/JobApplicationRepository.port";
import { ApplicationId } from "../../domain/value-objects/applicationId";

export class RemoveApplicationUseCase {
  constructor(private readonly repo: ApplicationRepositoryPort) {}

  async execute(appId: ApplicationId) {
    await this.repo.remove(appId)
  }
}
