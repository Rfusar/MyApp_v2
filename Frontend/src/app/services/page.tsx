const Config = () => {
  return (
    <div className="col-span-1 flex flex-col p-4 bg-gray-50 rounded shadow">
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-800 ml-1 mb-2">Services</label>
        <select className="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2">
          <option value="VIEW">Generative AI (Help bot)</option>
          <option value="DELETE">OCR</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-800 ml-1 mb-2">Apikey</label>
        <input className="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2" />
      </div>

      {/* Area che cresce */}
      <div className="flex-grow mb-4">
        <textarea
          className="w-full h-full min-h-[100px] border border-gray-300 rounded p-3 text-gray-900 resize-none"
          placeholder="Scrivi qui la query"
        />
      </div>

      <div className="flex justify-end">
        <button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Esegui query
        </button>
      </div>
    </div>
  );
};

const Result = () => {
  return (
    <div className="col-span-1 bg-blue-50 rounded shadow p-4 grid grid-rows-[auto_1fr] gap-4">
      <div className="border-b pb-2 text-lg font-semibold text-blue-900">Risultato</div>
      <div className="overflow-auto text-sm text-gray-700">


      </div>
    </div>
  );
};

export default function Database() {
  return (
    <div className="p-4 h-[85%] grid grid-cols-2 gap-6">
      <Result />
      <Config />
    </div>
  );
}

