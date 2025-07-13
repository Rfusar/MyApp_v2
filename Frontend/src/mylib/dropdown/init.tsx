"use client"
import { useState } from "react";
import Link from "next/link"
import { AiFillCaretRight, AiFillAccountBook, AiFillAlert, AiFillAliwangwang } from "react-icons/ai";
import { GoWorkflow } from "react-icons/go";
import Config from "./config.json";


const event_mouseover = "transition duration-200"

const List = ({check, data})=>{
    return (
        <ul
          className={`overflow-hidden transition-[max-height] duration-500 ease-in-out text-white ${
            check ? "max-h-[200px]" : "max-h-0"
          }`}
        >
          {data.map((e, i) => (
            <Link 
            href={e.link}
            className={`hover:translate-x-2 rounded-sm flex flex-row pl-10 p-2 cursor-pointer ${event_mouseover} text-base`} key={i}>
              <span>• {e.title}</span>
            </Link>
          ))}
        </ul>
    )
}


export const Dropdown = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const if_submenu = Array.isArray(item.submenu) && item.submenu.length > 0;

  const iconMap = {
    Batchs: <AiFillAccountBook />,
    "Call Api": <AiFillAlert />,
    WorkFlows: <GoWorkflow />,
    Settings: <AiFillAliwangwang />,
  };

  return (
    <div
      id={`Dropdown_${item.title}`}
      className={`${Config.sidebar.container}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={`${Config.sidebar.element}`}>
        <Link 
          href={item.link} 
          className={`flex flex-row items-center w-full p-2 ${event_mouseover} rounded text-lg text-white ${if_submenu ? "" : "hover:translate-x-2"}`}
        >
          {iconMap[item.title]}

          <span className="ml-2 flex flex-row items-center justify-between w-full">
            <b>{item.title}</b>
            {if_submenu && (
              <AiFillCaretRight
                className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
              />
            )}
          </span>
        </Link>
      </div>

      {if_submenu && <List check={isOpen} data={item.submenu} />}
    </div>
  );
};
