import {BodyRequestDB} from "./DB"
import {ReactNode} from "react"

//*INPUTS
export interface InputProps {
  label: {
    errorDescription: string;
    field?: string;
  };
  options: {
    type: string;
    placeholder?: string;
    onChange?: (e: any) => void;
  };
  mandatory: boolean;
}

export interface PopupProps {
    status: string; 
    title: string; 
    details: string; 
    onClose: () => void;
}

//*DROPDOWN
interface Subtitle {
    title: string;
    link: string;
}
export interface Item {
    title: string;
    link: string;
    submenu: Subtitle[];
}
export interface ListProps {
    check: boolean;
    data: Subtitle[]
}
export interface DD_props {
    item: Item
    key?: number;
}

//*TABLE
export interface TableProps {
  data?: any[] | null;
  getData: (body: Record<string, any>) => Promise<void>;
}

export interface TableFilterProps {
  getData?: (e:BodyRequestDB) => void;

}

//*POPUP
export type ModalTemplateType = "default" | "alert" | "form";

export type ModalContextType = {
  isOpen: boolean;
  content: ReactNode;
  template: ModalTemplateType;
  openModal: (content: ReactNode, template?: ModalTemplateType) => void;
  closeModal: () => void;
};

