export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode | null;
  footer?: React.ReactNode | null;
  onCloseCallback?: () => void;
}
