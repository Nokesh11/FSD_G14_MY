import React, { useState, useEffect, useContext } from "react";
import { ChevronFirst, AlignLeft, Settings } from "lucide-react";
import { sidebarContext } from "../pages/StudentDashBoard";


export default function AppBar() {
  const {expanded, setExpanded} = useContext(sidebarContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setExpanded(false);
        setIsMobile(true);
      } else if (window.innerWidth <= 1024) {
        setExpanded(false);
        setIsMobile(false);
      } else {
        setExpanded(true);
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex h-16">
      <div className="fixed top-0 left-0 w-full bg-white h-16 flex items-center shadow-md px-4 z-10">
        <button
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 mr-4"
          onClick={() => setExpanded((curr) => !curr)}
        >
          {expanded ? <ChevronFirst /> : <AlignLeft />}
        </button>

        <img
          src="https://img.logoipsum.com/243.svg"
          className="w-10 h-10 mr-4"
          alt="App Logo"
        />

        <h1 className="flex-grow text-gray-600 text-lg">CMS</h1>

        {/* Settings icon */}
        <button className="focus:outline-none">
          <Settings className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}