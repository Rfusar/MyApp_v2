import Config from "./config.json"
import {Dropdown} from "@/mylib/dropdown/init"
import {Item} from "@/types/Dati"


const LayoutSidebar = Config.Style

export default function Sidebar() {
    return (
        <aside className={LayoutSidebar}>
            <div className="w-full h-[15%] flex justify-center items-center">
                <span className="text-xl text-white">My Beatiful APP (LOGO)</span>
            </div>
            {Config.Data.list.map((e:Item, i:number)=>(
                <Dropdown key={i} item={e} />
            ))} 
        </aside>
    )
}
