import { gql } from "@apollo/client"

export const CREATE_JOB_APPLICATION = gql`
  mutation CreateJobApplication($company: String!, $position: String!) {
    createJobApplication(company: $company, position: $position) {
      id
      company
      position
      status
      createAt
      updatedAt
    }
  }
`

