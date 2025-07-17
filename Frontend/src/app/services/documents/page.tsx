import UploadButton from "./_UploadButton"

const Result = (): HTML.Element =>{
    return (
        <div className="row-span-14 bg-red-200">
        </div>
    )
}

export default function Home() {
  return (
    <div className="p-4 h-[85%] grid grid-rows-15">
        <UploadButton />
        <Result />
    </div>
  );
}

