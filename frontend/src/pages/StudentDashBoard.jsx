import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
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
              padding: 3,
              overflow: "auto",
              bgcolor: "#f5f5f5", // Light background for dashboard
            }}
          >
            {/* Metrics Overview */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Attendance Rate
                    </Typography>
                    <Typography variant="h4" color="primary">
                      95%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Upcoming Assignments
                    </Typography>
                    <Typography variant="h4" color="secondary">
                      3 Due
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      New Tickets
                    </Typography>
                    <Typography variant="h4" color="error">
                      5 Open
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Main Dashboard Content */}
            <Grid container spacing={4}>
              {/* Attendance Chart */}
              <Grid item xs={12} sm={6}>
                <Card sx={{ height: "100%", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Attendance Overview
                    </Typography>
                    <Box height="300px">
                      <AttendanceChart />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Schedule and Calendar Section */}
              <Grid item xs={12} sm={6}>
                <Card sx={{ height: "100%", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Today's Schedule & Calendar
                    </Typography>
                    <Box sx={{ display: "flex", height: "250px" }}>
                      <Box sx={{ flex: 1, mr: 2 }}>
                        <Typography variant="subtitle1" mb={2}>
                          Today's Classes
                        </Typography>
                        <Box
                          sx={{
                            height: "200px",
                            overflowY: "auto",
                            px: 1,
                            bgcolor: "#fafafa",
                            borderRadius: 1,
                          }}
                        >
                          {["Math Class", "Science Project", "Lunch Meeting", "Gym Session"].map(
                            (item, index) => (
                              <Box
                                key={index}
                                sx={{
                                  mb: 1,
                                  p: 1,
                                  border: "1px solid #ccc",
                                  borderRadius: 1,
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography variant="body2">{item}</Typography>
                                <Typography variant="caption">
                                  {index + 9}:00 AM
                                </Typography>
                              </Box>
                            )
                          )}
                        </Box>
                      </Box>
                      <Box sx={{ width: "40%", borderLeft: "1px solid #ccc", pl: 2 }}>
                        <Calender />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Additional Info - Tickets and More */}
              <Grid item xs={12} sm={6}>
                <Card sx={{ height: "100%", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Open Tickets
                    </Typography>
                    <Box height="250px">
                      <TicketTable />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Placeholder for Additional Content */}
              <Grid item xs={12} sm={6}>
                <Card sx={{ height: "100%", boxShadow: 3, bgcolor: "gray" }}>
                  <CardContent>
                    <Typography variant="h6" color="white" gutterBottom>
                      Extra Info
                    </Typography>
                    <Box
                      height="250px"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      color="white"
                    >
                      Custom Content
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </sidebarContext.Provider>
    </Box>
  );
}

export default StudentDashboard;
