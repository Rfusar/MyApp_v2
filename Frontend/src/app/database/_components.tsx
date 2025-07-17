import React from "react"
import {GetData} from "./_server";
import {QueryProps, FiltersProps, BtnFilter} from "./_types"

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

export const Button = ({onClick}: {onClick:()=>void})=>{
    //const myform: QueryProps = {
    //    collection: "Users",
    //    query: {method:"get", many:true}
    //}
    return (
      <div className="flex justify-end">
        <button
            onClick={onClick}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Esegui query
        </button>
      </div>
    )
}
