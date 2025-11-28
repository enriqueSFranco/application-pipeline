import { useAtomValue, useSetAtom } from "jotai";
import { TextField } from "../../../../shared/ui/TextField";
import { Button } from "../../../../shared/ui/button/Button";
import { newApplicationFormAtom } from "../../../../lib/jobApplication/infraestructure/state/application.atom";

export function JobScrapingForm() {

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const {name, value} = event.target
  }

  async function handleScrapeJob(url: string) {
  }

  return (
    <>
        <div className="flex flex-col gap-1.5">
          <TextField
            name="url"
            label="URL de la vacante"
            placeholder="Ej: https://..."
            helperText="Enlace a la oferta de trabajo original."
            onChange={handleChange}
          />
          <Button type="button" text="Scrapear" />
        </div>
        <TextField
          name="title"
          label="Título del puesto"
          placeholder="Ej: Desarrollador Front-end React Jr."
          helperText="Escribe el nombre del puesto al que te postulas."
          onChange={handleChange}
          // onBlur={() => handleBlur("title")}
        />
        <TextField
          name="company"
          label="Empresa"
          placeholder="Ej: Globant, Accenture, Wizeline"
          helperText="Nombre de la empresa que publica la vacante."
          // errorMessage={errors['job.company']?.[0]}
          // state={errors['job.company'] ? "error" : "default"}
          onChange={handleChange}
          // value={form.job.company}
        />
    </>
  );
}
