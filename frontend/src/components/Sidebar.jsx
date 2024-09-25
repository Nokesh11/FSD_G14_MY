import React, { useContext } from "react";
import SidebarItem from "./SidebarItem";
import { student as StudentItems } from "../Constants/Student.js";
import { sidebarContext } from "../pages/Student/StudentLayout.jsx";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const { expanded, isMobile } = useContext(sidebarContext);
  const location = useLocation();
  const currPage = location.pathname.split("/").pop();
  if (isMobile && !expanded) {
    return null;
  }
  return (
    <aside
      className={`h-full overflow-hidden top-2 transition-all duration-300 ${expanded ? "w-full" : "w-[72px]"}`}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <ul className="flex-1 px-3 my-1 text-black">
          {StudentItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              active={item.path === currPage}
              alert={item.alert}
            />
          ))}
        </ul>

        <div className="border-t flex p-3">
          <img
            src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
            alt="Profile"
            className="w-10 h-10 ml-1 rounded-full"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all duration-200 ${expanded ? "w-80 ml-1 " : "w-20"
              }`}
          >
            {expanded && (<div className="leading-4">
              <p className="font-semibold mb-0 text-black">John Doe</p>
              <span className="text-xs mt-0 text-gray-600">
                johnDoe@gmail.com
              </span>
            </div>)}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
