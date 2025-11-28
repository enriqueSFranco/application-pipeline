import { gql, type TypedDocumentNode } from "@apollo/client";
import { JobApplication } from "../../../../domain/JobApplication.schema";

type UpdateJobApplicationStatusMutation = {
  // El nombre de la propiedad raíz es el mismo que la operación en el schema
  updateJobApplicationStatus: JobApplication;
};


// 2. Tipo para las Variables (INPUTS)
type UpdateJobApplicationStatusMutationVariables = {
  id: string;
  status: string;
};

export const UPDATE_STATUS: TypedDocumentNode<UpdateJobApplicationStatusMutation, UpdateJobApplicationStatusMutationVariables> = gql`
  mutation UpdateJobApplicationStatus($id: ID!, $status: String!) {
    updateJobApplicationStatus(id: $id, status: $status) {
      id
      company
      position
      status
      createAt
      updatedAt
    }
  }
`;
