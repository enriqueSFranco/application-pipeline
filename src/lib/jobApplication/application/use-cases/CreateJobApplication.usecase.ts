import {IJobApplicationRepository} from "../ports/IJobApplicationRepository"

export class CreateJobApplicationUseCase {
  constructor(private readonly repository: IJobApplicationRepository) {}

  async execute(input: {company: string, position: string}) {
    await this.repository.create(input)
  }
}
