import { useAtomValue, useSetAtom } from "jotai";
import { Select } from "../../../shared/ui/Select";
import { TextField } from "../../../shared/ui/TextField";
import { TextEditor } from "../../../shared/ui/text-editor/TextEditor";
import { updateApplicationFieldAction } from "../../../lib/jobApplication/infraestructure/state/application.actions";
import { newApplicationFormAtom } from "../../../lib/jobApplication/infraestructure/state/application.atom";

export function ApplicationForm() {
  const form = useAtomValue(newApplicationFormAtom)
  const updateApplicationField = useSetAtom(updateApplicationFieldAction)

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const {name, value} = event.target
  }

  return (
    <>
      <TextField
        label="Fecha de postulación"
        name="appliedAt"
        type="date"
        helperText="Selecciona la fecha en que enviaste tu postulación."
        // errorMessage={errors.appliedAt}
        // state={errors.appliedAt ? "error" : "default"}
        // value={
        //   values.appliedAt
        //     ? dateFnsAdapter.formatDate(
        //         new Date(values.appliedAt),
        //         "yyyy-MM-dd"
        //       )
        //     : ""
        // }
        // onChange={handleChange}
      />
      <TextEditor placeholder="Ej: El puesto requiere experiencia en React y TypeScript. La reclutadora es Ana López (ana@empresa.com)." />
    </>
  );
}
