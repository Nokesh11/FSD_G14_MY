import { Box, Grid, Typography } from "@mui/material";
import React, { createContext, useState } from "react";
import Appbar from "../components/Appbar";
import Sidebar from "../components/Sidebar";
import Calender from "../components/Calender";

export const sidebarContext = createContext();

function StudentDashboard() {
  const [expanded, setExpanded] = useState(true);

  return (
    <Box>
      <sidebarContext.Provider value={{ expanded, setExpanded }}>
        <Appbar />
        <div className="flex w-full" style={{ height: "calc(100vh - 64px)" }}>
          <Sidebar />
          <Box
            sx={{
              flexGrow: 1,
              marginLeft: expanded ? "0px" : "64px",
              transition: "margin-left 0.3s ease",
              height: "100%",
              padding: 2,
            }}
          >
            <Grid container spacing={4} sx={{ height: "100%" }}>
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
                  Item 1
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
                      width: "70%", // Reduced width for the schedule
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
                        px: 2, // Removed vertical padding
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
                      width: "300px", // Fixed width for the calendar
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderLeft: "1px solid #ccc",
                      bgcolor: "white", // Background color for the calendar
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
                  height="100%"
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
                  height="100%"
                  bgcolor="blue"
                  color="white"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                  sx={{ boxShadow: 3 }}
                >
                  Item 3
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </sidebarContext.Provider>
    </Box>
  );
}

export default StudentDashboard;
