import {QueryProps, FilterComponentProps} from "./_types";
import React from "react"

const Filter: FilterComponentProps = {}


export async function GetData(
    form: QueryProps,
    setForm: React.Dispatch<React.SetStateAction<QueryProps>>
) {
    try {

        const res = await fetch("/api/db/system", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const text = await res.text();
        //console.log(text)
        setForm(prev => ({ ...prev, query: text }));
  
    } catch (err) {
        console.error("Errore durante la richiesta:", err);
    }
}
