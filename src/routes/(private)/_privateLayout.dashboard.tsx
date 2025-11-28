import { createFileRoute } from '@tanstack/react-router'
import { JobApplicationKanban } from '../../sections/job-application/desing-system/JobApplicationKanban'

export const Route = createFileRoute('/(private)/_privateLayout/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <JobApplicationKanban groupedByGroup={{Todo: [], InProgress: [], Done: []}} />
  </div>
}
