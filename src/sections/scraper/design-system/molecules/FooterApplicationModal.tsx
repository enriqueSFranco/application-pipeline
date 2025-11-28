import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "../../../../shared/ui/button/Button";
import { closeModalAtom } from "../../../../shared/ui/modal/modal.atom";
import { toast } from "sonner";
import { resetApplicationFormAction } from "../../../../lib/jobApplication/infraestructure/state/application.actions";
import { useApplicationState } from "../../../../lib/jobApplication/infraestructure/state/useApplicationState.hook";
import { isFormValidAtom } from "../../../../lib/jobApplication/infraestructure/state/application.selectors";

export function FooterApplicationForm() {
  const resetForm = useSetAtom(resetApplicationFormAction);
  const isFormValid = useAtomValue(isFormValidAtom);
  const closeModal = useSetAtom(closeModalAtom);

  const { isLoading, upsertApplication } = useApplicationState();

  async function handleUpsert() {
    await upsertApplication();

    toast.success("Postulación guardada correctamente.");
    resetForm();
    closeModal();
  }

  return (
    <div className="flex items-center justify-between gap-4 mt-4 h-full self-end">
      <Button
        id="add-job-form"
        text="Limpiar formulario"
        color="primary"
        onClick={resetForm}
      />
      <div className="flex items-center gap-4">
        <Button text="Cancelar" variant="ghost" color="error" onClick={closeModal} />
        <Button
          onClick={handleUpsert}
          text={isLoading ? "Guardando..." : "Agregar"}
          disabled={isLoading || !isFormValid}
        />
      </div>
    </div>
  );
}
