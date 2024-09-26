import React, { useEffect, useContext, useState } from "react";
import { ChevronFirst, AlignLeft, Settings } from "lucide-react";
import { sidebarContext } from "../pages/StudentLayout";


export default function AppBar() {
  const { expanded, setExpanded, setIsMobile } = useContext(sidebarContext);

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
  }, [setExpanded, setIsMobile]);

  const [isHovered, setIsHovered] = useState(false); // State to track hover

  return (
    <div className="relative flex h-16">
      <div className="fixed top-0 left-0 w-full bg-white h-16 flex items-center shadow-md px-4 z-10">

        <button
          className="p-1.5 rounded-lg mr-4"
          onClick={() => setExpanded((curr) => !curr)}
          style={{
            backgroundColor: isHovered ? '#6d28d9' : '#904dd3', // Change color on hover
            color: "white"
          }}
          onMouseEnter={() => setIsHovered(true)}  // Set hover state on enter
          onMouseLeave={() => setIsHovered(false)} // Unset hover state on leave
        >
          {expanded ? <ChevronFirst /> : <AlignLeft />}
        </button>

        <img
          src="https://img.logoipsum.com/243.svg"
          className="w-10 h-10 mr-4"
          alt="App Logo"
        />

        <h1 className="flex-grow text-gray-600 text-lg">CMS</h1>

        <button className="focus:outline-none">
          <Settings style={{ color: "#904dd3" }} />
        </button>
      </div>
    </div>
  );
}
