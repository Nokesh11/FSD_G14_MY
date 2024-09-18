import {
  ChevronFirst,
  LogOut,
  Home,
  Calendar,
  FileText,
  Clock,
  Book,
  ChevronLast,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import React, { createContext, useState } from "react";

const sidebarItems = [
  { icon: <Home />, text: "Dashboard", active: true },
  { icon: <Calendar />, text: "Attendance", active: false },
  { icon: <FileText />, text: "DocVault", active: false, alert: true },
  { icon: <Clock />, text: "TimeTable", active: false },
  { icon: <Book />, text: "Almanac", active: false },
];

export const SidebarContext = createContext();
function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className={`h-screen overflow-hidden transition-all ${expanded ? "w-56" : "w-16"}`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center border-b">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            onClick={() => setExpanded((curr) => !curr)}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 my-1">
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                text={item.text}
                active={item.active}
                alert={item.alert}
              />
            ))}
          </ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3">
          <img
            src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <p className="font-semibold mb-0">John Doe</p>
              <span className="text-xs mt-0 text-gray-600">
                johnDoe@gmail.com
              </span>
            </div>
            <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
              <LogOut className="p-0.5" />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
