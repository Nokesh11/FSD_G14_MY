import React, { useContext } from "react";
import { sidebarContext } from "../pages/Student/StudentLayout";
import { useNavigate } from "react-router-dom";

function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(sidebarContext);
  const navigate = useNavigate();

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${active
        ? "bg-gradient-to-tr bg-primary text-white"
        : "hover:bg-indigo-50 text-gray-600"
        }`}
        onClick={()=>{navigate(`/student/${text.toLowerCase()}`)}}
    >
      <span className={`flex-shrink-0 ${expanded ? "text-lg" : "text-sm"}`}>
        {icon}
      </span>
      <span
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
      >
        {text}
      </span>
      {alert && (
        <span
          className={`absolute right-2 w-2 h-2 rounded bg-red-500 ${expanded ? "" : "top-2"
            }`}
        ></span>
      )}
    </li>
  );
}

export default SidebarItem;
