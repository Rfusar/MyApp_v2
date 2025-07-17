import {UploadButton, ExtractionButton, ClassificationButton} from "./_Buttons"

const Result = (): HTML.Element =>{
    return (
        <div className="row-span-14 border">
        </div>
    )
}

export default function Home() {
  return (
    <div className="p-4 h-[85%] grid grid-rows-15">
        <div className="row-span-1 inline-flex gap-5" >
            <UploadButton />
            <ExtractionButton/>
            <ClassificationButton />
        </div>
        <Result />
    </div>
  );
}

