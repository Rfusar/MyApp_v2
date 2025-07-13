"use client";

import { useState } from "react";
import bcrypt from "bcryptjs";
import { Input } from "@/mylib/input";
import ConfigText from "./config.json";

const DivDescription = () => (
  <div className="row-span-1 bg-blue-500">
    <section>
      <div className="p-4">
        <h1 className="font-bold text-4xl ubuntu-bold">{ConfigText.Title}</h1>
      </div>
      <div className="p-4">
        <h3 className="text-xl ubuntu">{ConfigText.Subtitle}</h3>
      </div>
      <div className="p-4">
        <article>{ConfigText.Article}</article>
      </div>
    </section>
  </div>
);

const DivLogin = () => {
  const [azienda, setAzienda] = useState("");
  const [password, setPassword] = useState("");

  async function InitPackage() {
    const hash = await bcrypt.hash(password, 10);
    const res = await fetch("/api/initpackage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ azienda, password: hash }),
    });
    const json = await res.json();
    console.log(json);
  }

  return (
    <div className="row-span-1 p-5 relative">
      <Input
        label={{ field: "Nome Azienda", errorDescription: "Insert a valid Username" }}
        options={{ type: "text", value: azienda, onChange: (e: any) => setAzienda(e.target.value) }}
        mandatory={true}
      />
      <Input
        label={{ field: "Admin Password", errorDescription: "Insert a valid Password" }}
        options={{ type: "password", placeholder: "Nuova Password", value: password, onChange: (e: any) => setPassword(e.target.value) }}
        mandatory={true}
      />
      <button
        onClick={InitPackage}
        className="p-3 text-white text-sm bg-black absolute bottom-[20px] cursor-pointer right-[20px] rounded"
      >
        Crea Istanza
      </button>
    </div>
  );
};

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-white">
      <div className="grid grid-cols-2 w-[50%] h-[60%] shadow-lg">
        <DivDescription />
        <DivLogin />
      </div>
    </div>
  );
}

