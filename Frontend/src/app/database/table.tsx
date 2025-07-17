import { QueryInsert, BodyRequestDB } from "@/types/DB";
import {TableProps, TableFilterProps} from "@/types/Dati"
import Link from "next/link"

function getContent(type:string, data: Record<string, any>): HTML.Element {
    switch(type){
        case "Collections": 
        return (
            data.map((e, i) => (
              <tr key={i}>
                <td className="text-black border p-1">{e.collection}</td>
                <td className="text-black border p-1">{e.size}</td>
                <td className="text-black border p-1">{e.count}</td>
              </tr>
            ))
        )
    }
    return <div>error</div>
}


export default function Table({ thead, data, getData }: TableProps) {
  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-black rounded">
          {thead.data.map((e, i)=> (
            <th className="p-1 text-white" key={i}>{e}</th>
          ))}
          </tr>
        </thead>
        <tbody>
          {data ? getContent(thead.type, data) : (
            <tr>
              <td colSpan={4} className="text-center p-2">
                Non ci sono record
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
