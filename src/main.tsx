import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { client } from './lib/shared/infraestructure/graphql/apolloClient'
import {ApolloProvider} from "@apollo/client/react"
import './index.css'

// TanStack Router
import { RouterProvider, createRouter } from '@tanstack/react-router'
// Import the generated route tree
import { routeTree } from './routes/routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Conditionally enable mocking
async function enableMocking() {
  if (import.meta.env.MODE !== 'development') return
  const { worker } = await import('./__mocks__/browser')
  return worker.start({
    onUnhandledRequest: 'bypass'
  })
}

enableMocking().then(() => {
  const rootElement = createRoot(document.getElementById('root')!)
  rootElement.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </StrictMode>,
  )
})
