export interface TableProps {
  data?: Batch[] | null;
  getData?: () => void;
}

export interface TableFilterProps {
  getData?: () => void;
}

type ModalTemplateType = "default" | "alert" | "form";

type ModalContextType = {
  isOpen: boolean;
  content: ReactNode;
  template: ModalTemplateType;
  openModal: (content: ReactNode, template?: ModalTemplateType) => void;
  closeModal: () => void;
};

