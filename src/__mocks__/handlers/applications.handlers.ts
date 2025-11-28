import {graphql, HttpResponse} from "msw"

export const applicationHandlers = [
  graphql.query("GetApplications", ({query, variables}) => {
    const {applicationId} = variables
    return HttpResponse.json({
      data: {
        application: {
          id: applicationId || '75a22f38-c27c-4684-9bdf-d4b16435af1a',
          title: 'Desarrollador web'
        }
      }
    })
  })
]
