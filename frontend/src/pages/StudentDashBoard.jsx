import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import React, { createContext, useState } from "react";
import Appbar from "../components/Appbar";
import Calender from "../components/Calender";
import Sidebar from "../components/Sidebar";
import AttendanceChart from "../components/AttendanceChart";
import TicketTable from "../components/TicketTable";
import AnnouncementsTable from "../components/Announcements";

export const sidebarContext = createContext();

function StudentDashboard() {
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}>
      <sidebarContext.Provider value={{ expanded, setExpanded, isMobile, setIsMobile }}>
        <Appbar />
        <Box sx={{ display: "flex", flex: 1, height: "calc(100vh - 64px)" }}>
          <Box maxWidth="200px"><Sidebar /></Box>
          <Box
            sx={{
              flexGrow: 1,
              transition: "margin-left 0.3s ease",
              height: "100%",
              padding: 3,
              overflow: "auto",
              bgcolor: "#ffffff", // Light background for dashboard
            }}
          >
            {/* Metrics Overview */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ boxShadow: 3, backgroundImage: 'linear-gradient(to bottom, #ffffff, #f0f0f0)' }}>
                  <CardContent >
                    <Typography variant="h6" gutterBottom>
                      CGPA
                    </Typography>
                    <Typography variant="h4" color="primary">
                      9.25
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ boxShadow: 3, backgroundImage: 'linear-gradient(to bottom, #ffffff, #f0f0f0)' }}>
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
                <Card sx={{ boxShadow: 3, backgroundImage: 'linear-gradient(to bottom, #ffffff, #f0f0f0)' }}>
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
                <Card sx={{ height: "100%", boxShadow: 3, backgroundImage: 'linear-gradient(to bottom, #ffffff, #f0f0f0)' }}>
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
                <Card sx={{ height: "100%", boxShadow: 3, bgcolor: "#f7f7f7" }}>
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
                          {[
                            "Math Class",
                            "Science Project",
                            "Lunch Meeting",
                            "Gym Session",
                          ].map((item, index) => (
                            <Box
                              key={index}
                              sx={{
                                mb: 1,
                                p: 1,
                                border: "1px solid #ccc",
                                borderRadius: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                color: "#904dd3"
                              }}
                            >
                              <Typography variant="body2">{item}</Typography>
                              <Typography variant="caption">
                                {index + 9}:00 AM
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          width: "40%",
                          minWidth: "300px", // Set a minimum width for the calendar
                          borderLeft: "1px solid #ccc",
                          pl: 2,
                        }}
                      >
                        <Calender />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Tickets Table */}
              <Grid item xs={12} sm={8}>
                <TicketTable />
              </Grid>

              {/* Announcements Table */}
              <Grid item xs={12} sm={4}>
                <Card sx={{ boxShadow: 3, backgroundImage: 'linear-gradient(to bottom, #ffffff, #f0f0f0)' }}>
                  <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                    <AnnouncementsTable />
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          </Box>
        </Box >
      </sidebarContext.Provider >
    </Box >
  );
}

export default StudentDashboard;
