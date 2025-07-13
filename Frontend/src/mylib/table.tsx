import { Batch } from "@/types/Dati";
import { QueryInsert, BodyRequestDB } from "@/types/DB";


const TableFilter = ({ getData }: TableFilterProps): JSX.Element => {
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
      <button onClick={async ()=> await getData(view)} className="p-2 bg-blue-500 text-white rounded cursor-pointer">
        Ricarica
      </button>
      <button onClick={async ()=> await getData(insert)} className="p-2 bg-green-500 text-white rounded cursor-pointer">
        Aggiungi Record
      </button>
      <button className="p-2 bg-red-500 text-white rounded">
      Elimina Record
      </button>
    </section>
  );
};

export default function Table({ data, getData }: TableProps): JSX.Element {
  return (
    <>
      <TableFilter getData={getData} />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-black rounded">
            <th className="p-1 text-white">ID</th>
            <th className="p-1 text-white">Name</th>
            <th className="p-1 text-white">Email</th>
            <th className="p-1 text-white">Active</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((e, i) => (
              <tr key={i}>
                <td className="text-black border p-1">{(e as any)._id ?? "-"}</td>
                <td className="text-black border p-1">{e.name}</td>
                <td className="text-black border p-1">{e.email}</td>
                <td className="text-black border p-1">{e.isActive ? "Yes" : "No"}</td>
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
