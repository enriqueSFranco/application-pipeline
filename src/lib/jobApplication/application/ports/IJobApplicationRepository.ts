import { JobApplication } from "../../domain/JobApplication.schema";

export interface IJobApplicationRepository {
  getAll: () => Promise<JobApplication[]>
  create: (data: {company: string, position: string}) => Promise<JobApplication>,
  updateStatus: (id: string, status: string) => Promise<JobApplication>
}
