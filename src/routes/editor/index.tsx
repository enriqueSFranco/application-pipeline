import { createFileRoute } from '@tanstack/react-router'
import { GeneralInforForm } from '../../components/GeneralInfoForm'

export const Route = createFileRoute('/editor/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><GeneralInforForm /></div>
}
