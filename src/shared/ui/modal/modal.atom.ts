import { atom } from "jotai";
import { ModalState } from "./types";

const modalBaseAtom = atom<ModalState>({
  isOpen: false,
  title: "",
  content: null,
  footer: null,
  onCloseCallback: undefined,
});

export const openModalAtom = atom(
  null,
  (_, set, payload: Omit<ModalState, "isOpen">) => {
    set(modalBaseAtom, { ...payload, isOpen: true });
  }
);

export const closeModalAtom = atom(null, (get, set) => {
  const modalState = get(modalBaseAtom);
  if (modalState.onCloseCallback) {
    modalState.onCloseCallback();
  }
  set(modalBaseAtom, {
    isOpen: false,
    content: null,
    title: "",
    footer: null,
    onCloseCallback: undefined,
  });
});

export const modalDataAtom = atom(get => {
  const modalState = get(modalBaseAtom)
  const {isOpen, ...data} = modalState
  return {data, isOpen}
})

export const modalStatusAtom = atom((get) => get(modalBaseAtom).isOpen);
