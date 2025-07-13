"use client";

import { useState, useEffect } from "react";
import Table from "@/mylib/table/database";
import { useModal } from "@/context/popup";
import {Button, Method, QueryProps, Model, Collections, TextArea} from "./_filters";
import {GetData} from "./_async";

const Config = () => {
  const [form, setForm] = useState<QueryProps|null>({
    select: "get",
    model: "MongoDB",
    collection: "",
    query: ""
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="col-span-1 flex flex-col p-4 bg-gray-50 rounded shadow">
        <Method form={form} handleChange={handleChange}/>
        <Model form={form} handleChange={handleChange}/>
        <Collections form={form} handleChange={handleChange}/>
        <TextArea form={form}/>
        <Button form={form} GetData={GetData} setForm={setForm}/>
    </div>
  );
};

const Result = () => {
  const [data, setData] = useState<any[] | null>(null);
  const { openModal } = useModal();

  async function getData(body: Record<string, any>): Promise<void> {
    const res = await fetch("/api/db", { 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            action: "list-connections"
        })
    });
        const json = await res.json();
        setData(json["collections"]);
    }
 

  useEffect(() => {
    console.log("Dati aggiornati:", data);
  }, [data]); // Log solo quando data cambia

  return (
    <div className="col-span-1 bg-blue-50 rounded shadow p-4 grid grid-rows-[auto_1fr] gap-4">
      <div className="border-b pb-2 text-lg font-semibold text-blue-900">Risultato</div>
      <div className="overflow-auto text-sm text-gray-700">
        <Table data={data} getData={getData}/>

      </div>
    </div>
  );
};

export default function Database() {
  return (
    <div className="p-4 h-[85%] grid grid-cols-2 gap-6">
      <Result />
      <Config />
    </div>
  );
}

