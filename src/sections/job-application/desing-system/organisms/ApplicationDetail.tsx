import { useAtomValue, useSetAtom } from "jotai";
import { Header } from "../../../../shared/ui/Header";
import {
  formJobScrapingAtom,
  isEditingAtom,
  selectedJobAtom,
} from "../../store/atoms";
import { Button } from "../../../../shared/ui/button/Button";

export function ApplicationDetail() {
  const setIsEditing = useSetAtom(isEditingAtom);
  const selectedJob = useAtomValue(selectedJobAtom);
  const setFormValues = useSetAtom(formJobScrapingAtom);

  if (!selectedJob) return null;

  function handleEditClick() {
    setIsEditing(true);
    setFormValues(selectedJob);
  }

  return (
    <article className="text-black">
      <Header
        left={
          <div>
            <div>
              <h2>{selectedJob.title}</h2>
              <h3>{selectedJob.company}</h3>
            </div>
          </div>
        }
        right={
          <Button
            onClick={handleEditClick}
            variant="default"
            color="primary"
            text="Editar"
          />
        }
      />
      <div>
        <h2></h2>
      </div>
    </article>
  );
}
