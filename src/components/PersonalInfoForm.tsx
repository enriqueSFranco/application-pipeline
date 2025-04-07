import { TextField } from "./atoms/TextField";

interface PersonalInfoFormFields extends HTMLFormControlsCollection {
  photo: HTMLInputElement;
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  job: HTMLInputElement;
  phone: HTMLInputElement;
  email: HTMLInputElement;
}

interface PersonalInfoFormElements extends HTMLElement {
    readonly elements: PersonalInfoFormFields
}

export function PersonalInfoForm() {
  return (
    <form className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <TextField label="tu foto" />
        <button>eliminar</button>
      </div>

      <div className="flex items-center justify-between">
        <TextField label="first name" />
        <TextField label="last name" />
      </div>

        <TextField label="first name" />

      <div className="flex items-center justify-between">
        <TextField label="phone" />
        <TextField label="email" />
      </div>
    </form>
  );
}
