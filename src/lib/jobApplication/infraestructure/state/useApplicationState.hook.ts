import { useAtomValue, useSetAtom } from "jotai";
import {
  applicationError,
  applicationsByGroupedByStatus,
  applicationsCount,
  applicationsList,
  applicationStatus,
} from "./application.selectors";
import { deleteApplicationAtom, loadJobApplicationsAtom, saveJobApplicationAtom } from "./application.actions";

export function useApplicationState() {
  const applications = useAtomValue(applicationsList);
  const status = useAtomValue(applicationStatus);
  const error = useAtomValue(applicationError);

  const totalCount = useAtomValue(applicationsCount);
  const groupedApplications = useAtomValue(applicationsByGroupedByStatus);

  const fetchApplications = useSetAtom(loadJobApplicationsAtom);
  const upsertApplication = useSetAtom(saveJobApplicationAtom);
  const setDeleteApplication = useSetAtom(deleteApplicationAtom);

  async function deleteApplication(id: string) {
    await setDeleteApplication(id)
  }

  return {
    applications,
    count: totalCount,
    groupedByStatus: groupedApplications,
    status,
    isLoading: status === "loading",
    error,
    fetchApplications,
    upsertApplication,
    deleteApplication
  };
}
