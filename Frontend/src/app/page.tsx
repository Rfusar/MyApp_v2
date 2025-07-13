"use client";
import { useState, useEffect } from "react";
import Table from "@/mylib/table";
import { Batch } from "@/types/Dati";
import { useModal } from "@/context/popup";



export default function Home(): JSX.Element {
  const [data, setData] = useState<Batch[] | null>(null);
  const { openModal } = useModal();

  async function getData(body): Promise<void> {
    const res = await fetch("/api/db", { 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });
    if(body.query.method !== "get"){
        console.log(await res.text())
    }
    else{
        const json = await res.json();
        setData(json);
    }
  }

  useEffect(() => {
    console.log("Dati aggiornati:", data);
  }, [data]); // Log solo quando data cambia

  return (
    <div className="p-2 h-[85%]">
      <div className="overflow-auto p-2">
        <Table data={data} getData={getData} />
      </div>
    </div>
  );
}

