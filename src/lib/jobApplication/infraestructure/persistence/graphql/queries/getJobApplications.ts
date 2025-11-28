import { gql } from "@apollo/client";

export const GET_JOB_APPLICATIONS = gql`
  query GetJobApplications {
  jobApplications {
    id
    company
    position
    status
    createAt
    updatedAt
  }
}
`;

