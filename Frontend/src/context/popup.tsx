"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type TemplateType = "alert" | "confirm" | "custom";

type ModalContextType = {
  isOpen: boolean;
  content: ReactNode | null;
  template: TemplateType | null;
  openModal: (content: ReactNode, template?: TemplateType) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [template, setTemplate] = useState<TemplateType | null>(null);

  const openModal = (modalContent: ReactNode, modalTemplate: TemplateType = "custom") => {
    setContent(modalContent);
    setTemplate(modalTemplate);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
    setTemplate(null);
  };

  // Render layout in base al template
  function renderModalContent() {
    if (!content) return null;

    switch (template) {
      case "alert":
        return (
          <div className="bg-red-100 p-4 rounded shadow-lg max-w-md">
            {content}
            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
              Chiudi
            </button>
          </div>
        );
      case "confirm":
        return (
          <div className="bg-yellow-100 p-4 rounded shadow-lg max-w-md">
            {content}
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Annulla</button>
              <button onClick={closeModal} className="px-4 py-2 bg-yellow-500 text-white rounded">Conferma</button>
            </div>
          </div>
        );
      case "custom":
      default:
        return (
          <div className="bg-white p-4 rounded shadow-lg max-w-md">
            {content}
            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Chiudi
            </button>
          </div>
        );
    }
  }

  return (
    <ModalContext.Provider value={{ isOpen, content, template, openModal, closeModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {renderModalContent()}
        </div>
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal deve essere usato dentro ModalProvider");
  return context;
};

