import { type ApolloClient} from "@apollo/client"
// import { Job } from "../domain/job.schema"
// import { GET_ALL_JOBS_QUERY, GET_JOBS_BY_STATUS_QUERY, GET_JOB_BY_ID_QUERY, GetAllJobsQuery, GetJobsByStatusQuery } from "../../shared/infraestructure/graphql/job.queries"
import { SAVE_JOB_MUTATION, REMOVE_JOB_MUTATION, SaveJobMutation, SaveJobMutationVariables, RemoveJobMutation, RemoveJobMutationVariables } from "../../shared/infraestructure/graphql/job.mutations"
import { ZodError } from "zod"
// import { JobNotFoundError, JobRepositoryError } from "../domain/job.error"
// import { NetworkError } from "../../shared/domain/errors"
import { ScraperRepositoryPort } from "../../domain/ScraperRepository.port"

export const createApolloRepository = (client: ApolloClient): ScraperRepositoryPort => ({
  getAll: async (): Promise<Job[]> => {
    try {
      const {data, error} = await client.query<GetAllJobsQuery>({query: GET_ALL_JOBS_QUERY})
      if (!data?.jobs) return []

      if (error) {
        throw new JobRepositoryError(`GraphQL error: ${error.message}`, "")
      }
      const validatedJobs = data.jobs.map(job => JobSchema.parse(job))
      return validatedJobs
    } catch (error) {
      if (error instanceof JobRepositoryError || error instanceof NetworkError) {
        throw error
      }
      throw new JobRepositoryError("An unknown error occurred in the repository.", "");
    }
  },
  findById: async (id: string): Promise<Job> => {
    try {
      const {data} = await client.query({
        query: GET_JOB_BY_ID_QUERY,
        variables: {id}
      })

      if (!data?.job) throw new JobNotFoundError("Job", id);

      const validatedJob = JobSchema.parse(data.job)
      return validatedJob;
    } catch (error) {
      if (error instanceof JobNotFoundError) throw error
      throw new JobRepositoryError("Job", id);
    }
  },
  findByStatus: async (id: string): Promise<Job[]> => {
    try {
      const {data} = await client.query<GetJobsByStatusQuery>({
        query: GET_JOBS_BY_STATUS_QUERY,
        variables: {id}
      })
      if (!data?.jobsByStatus) return []

      const validatedJobs = data.jobsByStatus.map(job => JobSchema.parse(job))
      return validatedJobs
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Data validation error:', error.flatten());
        return [];
      }
      throw error
    }
  },
  save: async (job: Job): Promise<Job> => {
    try {
      const {data, error} = await client.mutate<SaveJobMutation, SaveJobMutationVariables>({
        mutation: SAVE_JOB_MUTATION,
        variables: {jobInput: job}
      })

      // Manejamos los errores de GraphQL que puedan venir de la respuesta
      if (error) {
        throw new JobRepositoryError(`GraphQL error while saving job: ${error}`, "")
      }

      if (!data || !data.saveJob) {
        throw new JobRepositoryError("Server did not return a valid job after saving.", job.url)
      }

      const validatedJob = JobSchema.parse(job)
      return validatedJob
    } catch (error) {
      if (error instanceof JobRepositoryError) throw error
      throw new JobRepositoryError(`An unexpected error occurred while saving the job.`, "");
    }
  },
  remove: async (id: string): Promise<string> => {
    try {
      const {data, error} = await client.mutate<RemoveJobMutation, RemoveJobMutationVariables>({
        mutation: REMOVE_JOB_MUTATION,
        variables: {jobId: id}
      })
      if (error) {
        const errorMessage = error.message
        if (errorMessage.includes("not found")) {
          throw new JobNotFoundError(`Job with ID "${id}" was not found.`, "");
        }
        throw new JobRepositoryError(`GraphQL error while removing job: ${errorMessage}`, "");
      }
      if (!data || !data.removeJob) {
        throw new JobRepositoryError(`Server did not confirm removal for job with ID "${id}".`, "");
      }
      return data.removeJob
    } catch(error) {
      if (error instanceof JobNotFoundError || error instanceof JobRepositoryError) {
        throw error
      }
      throw new JobRepositoryError(`An unexpected error occurred while removing the job.`, "");
    }
  }
})
