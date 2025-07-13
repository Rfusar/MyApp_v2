import { QueryInsert, BodyRequestDB } from "@/types/DB";
import {TableProps, TableFilterProps} from "@/types/Dati"


const TableFilter = ({ getData }: TableFilterProps) => {
    const insert: BodyRequestDB = {
        collection: "Users",
        query: {
            method: "insert",
            many: false,
            data: {"utente1":"A"}
        }
    }
    const view: BodyRequestDB = {
        collection: "Users",
        query: {
            method: "get",
            many: true,
        }
    }
  return (
    <section className="flex gap-2 mb-4 ">
      <select className="p-1 border rounded text-black">
        <option value="5m">5min</option>
        <option value="1m">1min</option>
        <option value="30s">30sec</option>
        <option value="-1">Tempo Reale</option>
      </select>
      <button onClick={async ()=> {
          if(getData){ await getData(view)}
      }} className="p-2 bg-blue-500 text-white rounded cursor-pointer">
        Ricarica
      </button>
      <button onClick={async ()=> {
          if(getData){ await getData(insert)}
      }} className="p-2 bg-green-500 text-white rounded cursor-pointer">
        Aggiungi Record
      </button>
      <button className="p-2 bg-red-500 text-white rounded">
      Elimina Record
      </button>
      <select className="p-2 bg-purple-700 text-white rounded">
        <option>Inserisci collezione</option>
        <option>Users</option>
        <option>Services</option>
        <option>Provider</option>
      </select>
    </section>
  );
};

export default function Table({ data, getData }: TableProps) {
  return (
    <>
      <TableFilter getData={getData} />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-black rounded">
            <th className="p-1 text-white">NameID</th>
            <th className="p-1 text-white">Password</th>
            <th className="p-1 text-white">CompanyName</th>
            <th className="p-1 text-white">Group</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((e, i) => (
              <tr key={i}>
                <td className="text-black border p-1">{e.NameID ?? "-"}</td>
                <td className="text-black border p-1">{e.Password}</td>
                <td className="text-black border p-1">{e.CompanyName}</td>
                <td className="text-black border p-1">{e.Group}</td>
              </tr>
            ))
          ) : (
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
