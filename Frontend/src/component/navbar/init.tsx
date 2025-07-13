import Config from "./config.json"
//import {Dropdown} from "@/mylib/dropdown/init"
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";

const LayoutNavbar = Config.Style

export default function Navbar() {
    return (
        <nav className={LayoutNavbar} style={{borderBottom:"2px solid #0001"}}>
            <div className="w-full h-full flex flex-1 items-center justify-center text-black">
                <span>{Config.Data.Header.title}</span>
            </div>
            <div className="w-full h-full flex flex-1 text-black">
                <div className="flex-1"></div>
                <div className="flex flex-1 flex-row items-center gap-10">
                {Config.Data.Session.map((e, i)=>(
                    <span key={i}>
                        {e.title=="Msg"&&<MdEmail className="cursor-pointer size-8"/>}
                        {e.title=="Profile"&&<CgProfile className="cursor-pointer size-8"/>}
                    </span>
                ))} 
                </div>
            </div>
        </nav>
    )
}
