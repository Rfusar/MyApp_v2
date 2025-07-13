import {Input} from "@/mylib/input";


const Base = (): JSX.Element => {
    return (
        <div className="col-span-3 bg-red-200 p-4">
        <div className="">
            <Input
                label={{errorDescription:"Nome non valido"}}
                options={{type:"text", placeholder:"Name"}}
                mandatory={false}
            /> 
        </div>

        </div>
    );
};


const Details = (): JSX.Element => {
    return (
        <div className="col-span-7 bg-blue-200">

        </div>
    );
};







//*Main
export default function Profile(): JSX.Element {
  return (
    <div className="grid grid-cols-10 h-screen w-screen">
        <Base />
        <Details/>
    </div>
  );
}
