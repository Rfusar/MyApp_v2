import React from "react"
import {GetData} from "./_async";

interface QueryProps {
    select: "get" | "update" | "insert" | "delete";
    model: "MongoDB";
    collection?: string;
    query: "";
}

interface FiltersProps {
    form: QueryProps;
    handleChange: (field:string, value: string)=>void;
}
interface BtnFilter {
    form: QueryProps;
    GetData: (form: QueryProps, setForm: React.Dispatch<React.SetStateAction<QueryProps>>)=>void;
    setForm: React.Dispatch<React.SetStateAction<QueryProps>>;
}


export const Method = ({form, handleChange}:FiltersProps)=>{
      return (
        <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-800 ml-1 mb-2">Metodo</label>
            <select
              value={form.method}
              onChange={e => handleChange("method", e.target.value)}
              className="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2"
            >
                <option value="get">VIEW</option>
                <option value="delete">DELETE</option>
                <option value="update">UPDATE</option>
                <option value="insert">INSERT</option>
            </select>
        </div>
    )
}

export const Model = ({form, handleChange}: FiltersProps)=>{
    return (
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-800 ml-1 mb-2">Modello</label>
        <select
          value={form.model}
          onChange={e => handleChange("model", e.target.value)}
          className="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2"
        >
          <option value="MongoDB">MongoDB</option>
        </select>
      </div>

    )
}


export const Collections = ({form, handleChange}:FiltersProps) =>{
    return (
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-800 ml-1 mb-2">Collection</label>
        <input
          type="text"
          value={form.collection}
          onChange={e => handleChange("collection", e.target.value)}
          className="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2"
        />
      </div>
    )
} 

export const TextArea = ({form}:QueryProps)=>{
    return ( 
        <div className="flex-grow mb-4">
          <textarea
            className="w-full h-full min-h-[100px] border border-gray-300 rounded p-3 text-gray-900 resize-none"
            placeholder="Scrivi la query"
            value={form.query}
          />
        </div>
    )
}

export const Button = ({form, GetData, setForm}:BtnFilter)=>{
    return (
      <div className="flex justify-end">
        <button
          onClick={()=> GetData(form, setForm)}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Esegui query
        </button>
      </div>
    )
}
