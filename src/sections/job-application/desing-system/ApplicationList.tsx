import { useAtomValue, useSetAtom } from "jotai";
import { openModalAtom } from "../../../shared/ui/modal/modal.atom";
import { ApplicationView } from "./organisms/ApplicationView";
import { ApplicationCard } from "./ApplicationCard";
import { Application } from "../../../lib/jobApplication/domain/JobApplication.schema";
import { isEditingAtom } from "../../../lib/jobApplication/infraestructure/state/application.atom";
import { useApplicationState } from "../../../lib/jobApplication/infraestructure/state/useApplicationState.hook";

interface Props {
  jobApplications: Application[];
}

export function ApplicationList({ jobApplications }: Props) {
  const isEditing = useAtomValue(isEditingAtom);
  const {deleteApplication} = useApplicationState();
  const openModal = useSetAtom(openModalAtom)

  const handleViewApplicationDetail = () => {
    openModal({
      title: isEditing ? "Modo edición" : "Detalles de tu postulación",
      content: <ApplicationView />
    })
  }

  return (
      <ul className="flex flex-col gap-4">
        {jobApplications.map((app) => (
          <li key={`apps-${app.id}`} data-testid={app.id}>
            <ApplicationCard
              application={app}
              onDelete={deleteApplication}
              onViewApplicationDetail={handleViewApplicationDetail}
            />
          </li>
        ))}
      </ul>
  );
}
