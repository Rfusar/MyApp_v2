"use client";

import { useState, useEffect } from "react";
import Table from "@/mylib/table/database";
import { useModal } from "@/context/popup";



export default function Home() {
  const [data, setData] = useState<any[] | null>(null);
  const { openModal } = useModal();

  async function getData(body:Record<string,any>): Promise<void> {
    const res = await fetch("/api/db/b2b", { 
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

