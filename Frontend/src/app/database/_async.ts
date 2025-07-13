import {QueryProps} from "./_filters";
import React from "react"

export async function GetData(
    form: QueryProps,
    setForm: React.Dispatch<React.SetStateAction<QueryProps>>
) {
    try {
        const res = await fetch("/api/db", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const text = await res.text();
        setForm(prev => ({ ...prev, query: text }));
  
    } catch (err) {
        console.error("Errore durante la richiesta:", err);
    }
}
