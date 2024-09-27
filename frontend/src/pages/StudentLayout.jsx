import { Box } from "@mui/material";
import { useState, createContext } from "react";
import Appbar from "../components/Appbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { student } from "../Constants/Student";
import { faculty } from "../Constants/Faculty";

export const sidebarContext = createContext();

function StudentLayout() {
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const role = localStorage.getItem("role");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <sidebarContext.Provider
        value={{ expanded, setExpanded, isMobile, setIsMobile }}
      >
        <Appbar />
        <Box sx={{ display: "flex", flex: 1, height: "calc(100vh - 64px)" }}>
          <Box maxWidth="200px">
            <Sidebar array={role === "student" ? student : faculty} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              transition: "margin-left 0.3s ease",
              height: "100%",
              padding: 3,
              overflow: "auto",
              bgcolor: "white",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </sidebarContext.Provider>
    </Box>
  );
}

export default StudentLayout;
