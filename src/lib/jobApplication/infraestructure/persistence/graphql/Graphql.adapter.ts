import { client } from "../../../../shared/infraestructure/graphql/apolloClient";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { IJobApplicationRepository } from "../../../application/ports/IJobApplicationRepository";
import { JobApplication } from "../../../domain/JobApplication.schema";
import { GET_JOB_APPLICATIONS } from "./queries/getJobApplications.ts";
import { CREATE_JOB_APPLICATION } from "../graphql/mutations/createJobApplication.ts";
import { UPDATE_STATUS } from "../graphql/mutations/updateJobApplicationStatus.ts";

export class GraphqlAdapter implements IJobApplicationRepository {
  async getAll(): Promise<JobApplication[]> {
    try {
      const { data } = await client.query<{
        jobApplications: JobApplication[];
      }>({
        query: GET_JOB_APPLICATIONS,
      });
      if (data?.jobApplications === undefined) {
        return [];
      }
      // TODO: Manejar errores de la peticion

      // TODO: mapear la respuesta
      return data?.jobApplications.map((item: JobApplication) => ({
        ...item,
        createAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      }));
    } catch (e) {
      throw new Error(`Hubo un error ${e}`);
    }
  }
  // async findById(id: ApplicationId): Promise<JobApplication | null> {
  //   try {
  //     const response = await apiClient.get<{ application: JobApplication }>(
  //       `${this.endpoint}/${id}`
  //     );
  //     // TODO: Manejar errores de la peticion
  //     // TODO: mapear la respuesta
  //     return response.data.application;
  //   } catch (e) {
  //     throw new Error(`Hubo un error ${e}`);
  //   }
  // }
  async create(data: {
    company: string;
    position: string;
  }): Promise<JobApplication> {
    try {
      const result = await client.mutate({
        mutation: CREATE_JOB_APPLICATION,
        variables: data,
      });

      const item = result.data.createJobApplication;
      // TODO: Manejar errores de la peticion
      // TODO: mapear la respuesta
      const newJobApplication: JobApplication = {
        ...item,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      };
      return newJobApplication;
    } catch {}
  }
  async updateStatus(id: string, status: string): Promise<JobApplication> {
    try {
      const result = await client.mutate({
        mutation: UPDATE_STATUS,
        errorPolicy: "all",
        variables: { id, status },
      });

      if (result.error && CombinedGraphQLErrors.is(result.error)) {
        console.log("GraphQL errors:", result.error.errors);
        console.log("Partial data:", result.data);
      }

      const item = result.data?.updateJobApplicationStatus;
      if (!item) {
        throw new Error("Mutation data is missing or null.");
      }

      const updated: JobApplication = {
        ...item,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      };

      return updated;
    } catch (e) {
      if (CombinedGraphQLErrors.is(e)) {
        console.log("GraphQL errors:", e.errors);
      }
    }
  }
}
