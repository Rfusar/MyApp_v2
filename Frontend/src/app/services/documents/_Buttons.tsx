"use client"
import { useRef } from "react";

function handleFileChange(e: React.ChangeEvent<HTMLInputElement>){
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log("File selezionato:", files[0]);
    }
};


export const UploadButton = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //*Simula il click
  const handleClick = () => { fileInputRef.current?.click(); };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-700 text-white font-blank text-sm p-2 rounded cursor-pointer"
      >
        Aggiungi file
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export const ExtractionButton = ()=>{
  return (
    <div>
      <button
        className="bg-red-700 text-white font-blank text-sm p-2 rounded cursor-pointer"
      >
        Estrai dati dal Documento
      </button>
    </div>
  );
}
export const ClassificationButton = ()=>{
  return (
    <div>
      <button
        className="bg-yellow-400 text-black font-blank text-sm p-2 rounded cursor-pointer"
      >
        Classifica il Documento
      </button>
    </div>
  );
}
