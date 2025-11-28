import { atom } from "jotai";

export const formTouchedAtom = atom<Record<string, boolean>>({}) // Mapa de campos que han sido "tocados"
export const formSubmittedAtom = atom(false) // Bandera para el estado de enviado del formulario
