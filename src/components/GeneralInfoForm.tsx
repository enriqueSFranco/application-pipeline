import { TextField } from "./atoms/TextField";

interface GeneralInforFormFields extends HTMLFormControlsCollection {
  projectName: HTMLInputElement;
  description: HTMLTextAreaElement;
}

interface GeneralInforFormElements extends HTMLElement {
  readonly elements: GeneralInforFormFields;
}

export function GeneralInforForm() {
  return (
    <form action="">
      <TextField label="Nombre del proyecto" />
      {/* implementar un editor de texto */}
    </form>
  );
}
