"use client";
import { useState, useEffect } from "react";
import { TbXboxXFilled } from "react-icons/tb";
import { createPortal } from "react-dom";
import { FaRegEye } from "react-icons/fa";

interface InputProps {
  label: {
    errorDescription: string;
    field?: string;
  };
  options: {
    type: string;
    placeholder?: string;
  };
  mandatory: boolean;
}

// Popup con animazione di discesa
const Popup = ({ status, title, details, onClose }: { status: string; title: string; details: string; onClose: () => void }) => {
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    setPopupVisible(true); // Attiva l'animazione

    const timer = setTimeout(() => {
      setPopupVisible(false);
      setTimeout(onClose, 500); // Attendi la fine dell'animazione prima di rimuoverlo
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 bg-opacity-50 flex justify-center z-50">
      <div
        className={`bg-white p-5 rounded-lg shadow-sm border-1 border-solid transition-transform duration-500 h-max ${
          popupVisible ? "translate-y-10 opacity-100" : "-translate-y-20"
        }`}
      >
        <div className="flex flex-row gap-3 text-black">
          {status=="error"&&<TbXboxXFilled className="text-xl text-red-500"/>}
          <span className="font-bold">{title}</span>
        </div>
        <div className="text-black">{details}</div>
      </div>
    </div>,
    document.body
  );
};

export function Input({ label, options, mandatory }: InputProps) {
  const [err, setErr] = useState("default");
  const [viewPassword, setViewPassword] = useState("password");
  const [showPopup, setShowPopup] = useState(false);

  const validation = (e) => {
    const { type, value, dataset } = e.target;
    let isValid = true;

    switch (type) {
      case "email":
        isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/.test(value);
        if (!mandatory && value === "") isValid = true;
        break;

      case "password":
        isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$.!%*#?&]{16,}$/.test(value);
        break;
    }

    if (!isValid) {
      setErr(false);
      setShowPopup(true);
    } else {
      setErr(true);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full flex justify-start gap-1 relative bottom-[-10px]">
        {label.field && <label className="text-small text-black">{label.field}</label>}
        {mandatory && <span className="text-red-600">*</span>}
      </div>
      <div className={`grid ${options.type=="password"?"grid-cols-10":"grid-cols-1"}`}>
        <input
          type={options.type}
          className={`border 
            ${options.type=="password"?"col-span-9":""} 
            focus:border-blue-500 p-2 outline-none rounded transition-all text-black duration-300
            ${err==false ? "border-red-400 hover:border-gray-200" : err==true ? "border-green-400" : "border-gray-200"}`}
          required={mandatory}
          placeholder={options.placeholder}
          onFocus={() => setErr("default")}
          onBlur={validation}
        />
        {options.type=="password"&&(
            <div className="col-span-1 flex items-center pl-3 cursor-pointer"
                onClick={(e)=>{
                    const I = e.target.parentElement.firstChild
                    console.log(I)
                    I.type = I.type=="password"?"text":"password"
                }}
                >
                <FaRegEye className="text-blue-800 text-3xl pointer-events-none"/>
            </div>
        )}
      </div>
      {showPopup && (
        <Popup
          status="error"
          title="Email e/o password non corretti"
          details={label.errorDescription}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
