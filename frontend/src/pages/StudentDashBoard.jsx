import { Box, Grid, Typography } from "@mui/material";
import React, { createContext, useState } from "react";
import Appbar from "../components/Appbar";
import Calender from "../components/Calender";
import Sidebar from "../components/Sidebar";
import AttendanceChart from "../components/AttendanceChart";
import TicketTable from "../components/TicketTable";

export const sidebarContext = createContext();

function StudentDashboard() {
  const [expanded, setExpanded] = useState(true);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <sidebarContext.Provider value={{ expanded, setExpanded }}>
        <Appbar />
        <Box sx={{ display: "flex", flex: 1, height: "calc(100vh - 64px)" }}>
          <Sidebar />
          <Box
            sx={{
              flexGrow: 1,
              marginLeft: expanded ? "0px" : "64px",
              transition: "margin-left 0.3s ease",
              height: "100%",
              padding: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid container spacing={4} sx={{ flexGrow: 1 }}>
              {/* Left Grid Item */}
              <Grid item xs={12} sm={6}>
                <Box
                  width="100%"
                  height="350px"
                  bgcolor="black"
                  color="white"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                  sx={{ boxShadow: 3 }}
                >
                  <AttendanceChart />
                </Box>
              </Grid>

              {/* Combined Schedule and Calendar Section */}
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    height: "350px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Schedule Section */}
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      width: "70%",
                    }}
                  >
                    {/* Fixed Heading */}
                    <Typography
                      variant="h6"
                      sx={{
                        padding: 2,
                        borderBottom: "1px solid #ddd",
                        textAlign: "center",
                      }}
                    >
                      Today's Schedule
                    </Typography>

                    {/* Scrollable List */}
                    <Box
                      sx={{
                        flexGrow: 1,
                        overflowY: "auto",
                        px: 2,
                      }}
                    >
                      {[
                        "Math Class",
                        "Science Project",
                        "Lunch Meeting",
                        "Gym Session",
                      ].map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            marginBottom: 2,
                            padding: 1,
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body1">{item}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {index + 9}:00 AM {/* Dummy time */}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Calendar Section */}
                  <Box
                    sx={{
                      width: "300px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderLeft: "1px solid #ccc",
                      bgcolor: "white",
                    }}
                  >
                    <Calender />
                  </Box>
                </Box>
              </Grid>

              {/* Additional Grid Items */}
              <Grid item xs={12} sm={6}>
                <Box
                  width="100%"
                  height="350px"
                  bgcolor="gray"
                  color="white"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                  sx={{ boxShadow: 3 }}
                >
                  Item 2
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box
                  width="100%"
                  height="350px"
                  bgcolor="blue"
                  color="white"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                  sx={{ boxShadow: 3 }}
                >
                  <TicketTable />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </sidebarContext.Provider>
    </Box>
  );
}

export default StudentDashboard;
