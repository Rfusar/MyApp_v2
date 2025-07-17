"use client";
import { useState } from "react";
import Table from "./table";
import { useModal } from "@/context/popup";
import { Button, Method, Model, Collections, TextArea } from "./_components";
import { QueryProps } from "./_types";

// ---------- Config Component ----------
interface ConfigProps {
  form: QueryProps | null;
  handleChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

const Config = ({ form, handleChange, onSubmit }: ConfigProps) => {
  return (
    <div className="col-span-1 flex flex-col p-4 bg-gray-50 rounded shadow">
      <Method form={form} handleChange={handleChange} />
      <Model form={form} handleChange={handleChange} />
      <Collections form={form} handleChange={handleChange} />
      <TextArea form={form} />
      <Button onClick={onSubmit} />
    </div>
  );
};

// ---------- Result Component ----------
interface ResultProps {
  data: any[] | null;
  getData: (body: Record<string, any>) => Promise<void>;
}

const Result = ({ data, getData }: ResultProps) => {
  const thead = {
    type: "Collections",
    data: ["Nome Collezione", "Memoria", "N° Record"],
  };

  return (
    <div className="col-span-1 bg-blue-50 rounded shadow p-4 grid grid-rows-[auto_1fr] gap-4">
      <div className="border-b pb-2 text-lg font-semibold text-blue-900">
        Risultato
      </div>
      <div className="overflow-auto text-sm text-gray-700">
        <Table thead={thead} data={data} getData={getData} />
      </div>
    </div>
  );
};

// ---------- Main Component ----------
export default function Database() {
  const [form, setForm] = useState<QueryProps | null>({
    select: "get",
    model: "MongoDB",
    collection: "",
    query: "",
  });

  const [data, setData] = useState<any[] | null>(null);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const getData = async (body: Record<string, any>) => {
    const res = await fetch("/api/db/system", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "list-collections",
        ...body,
      }),
    });
    const json = await res.json();
    setData(json["collections"]);
  };

  const handleSubmit = () => {
    if (form) getData(form);
  };

  return (
    <div className="p-4 h-[85%] grid grid-cols-2 gap-6">
      <Result data={data} getData={getData} />
      <Config form={form} handleChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
}

