import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tabs,
  Tab,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import Calendar from "../../components/Calender";
import TicketTable from "../../components/TicketTable";
import AnnouncementsTable from "../../components/Announcements";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AttendanceChart from "../../components/AttendanceChart";
import dayjs from "dayjs";
import axios from "axios";

function StudentDashboard() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0: Classes, 1: Tasks

  // Get tasks for the selected date
  const selectedDateTasks = tasks[selectedDate.format("YYYY-MM-DD")] || [];

  axios.defaults.withCredentials = true;
  // Handle adding a new task
  const addTask = useCallback(async () => {
    if (!newTask.trim()) return; // Prevent adding empty tasks

    const date = selectedDate.format("YYYY-MM-DD");
    const currentTasks = tasks[date] || [];
    const updatedTasksForDate = [...currentTasks, newTask];

    setTasks((prevTasks) => ({ ...prevTasks, [date]: updatedTasksForDate }));
    setNewTask(""); // Clear input field
    setOpenDialog(false); // Close the dialog

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/calendar/edit-event`,
        {
          date,
          events: updatedTasksForDate,
        }
      );
    } catch (error) {
      console.error("Failed to update tasks", error);
    }
  }, [newTask, selectedDate, tasks]); // Dependencies

  // Handle deleting a task, wrapped in useCallback to avoid re-creation
  const removeTask = useCallback(
    async (indexToRemove) => {
      const date = selectedDate.format("YYYY-MM-DD");
      const updatedTasksForDate = tasks[date].filter(
        (_, index) => index !== indexToRemove
      );

      setTasks((prevTasks) => ({ ...prevTasks, [date]: updatedTasksForDate }));

      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/calendar/edit-event`,
          {
            date,
            events: updatedTasksForDate,
          }
        );
      } catch (error) {
        console.error("Failed to update tasks", error);
      }
    },
    [selectedDate, tasks]
  ); // Dependencies

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/calendar/get-events`
        );
        if (response.status === 200) setTasks(response.data.tasks);
        else setTasks({});
      } catch {
        console.error("Failed to fetch tasks");
      }
    };
    getTasks();
  }, []);

  // Handle changing selected date
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              boxShadow: 3,
              backgroundImage: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
            }}
          >
            <CardContent>
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
          <Card
            sx={{
              boxShadow: 3,
              backgroundImage: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
            }}
          >
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
          <Card
            sx={{
              boxShadow: 3,
              backgroundImage: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
            }}
          >
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
          <Card
            sx={{
              height: "100%",
              boxShadow: 3,
              backgroundImage: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance Overview
              </Typography>
              <Box sx={{ flexGrow: 1, height: "100%", minHeight: "250px" }}>
                <AttendanceChart />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Schedule and Calendar Section */}
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} direction={{ sm: "column", md: "row" }}>
            {/* Schedule and Tabs Card */}
            <Grid item sm={12} md={6}>
              <Card
                sx={{
                  height: "380px",
                  boxShadow: 3,
                  backgroundImage:
                    "linear-gradient(to bottom, #ffffff, #f0f0f0)",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Today's Schedule & Tasks
                  </Typography>
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                    <Tab label="Classes" />
                    <Tab label="Tasks" />
                  </Tabs>

                  {activeTab === 0 ? (
                    <Box sx={{ p: 2 }}>
                      {/* Classes content */}
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
                            p: 2,
                            border: "1px solid #ccc",
                            borderRadius: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            bgcolor: "#fff",
                          }}
                        >
                          <Typography variant="body2">{item}</Typography>
                          <Typography variant="caption">
                            {index + 9}:00 AM
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        p: 2,
                        position: "relative",
                        overflow: "auto",
                        height: 300,
                      }}
                    >
                      {/* Tasks content */}
                      {selectedDateTasks.length === 0 ? (
                        <Typography>No tasks for this day.</Typography>
                      ) : (
                        selectedDateTasks.map((task, index) => (
                          <Box
                            key={index}
                            sx={{
                              mb: 1,
                              p: 2,
                              border: "1px solid #ccc",
                              borderRadius: 2,
                              display: "flex",
                              justifyContent: "space-between",
                              bgcolor: "#fff",
                            }}
                          >
                            <Typography variant="body2">{task}</Typography>
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="delete"
                              onClick={() => removeTask(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        ))
                      )}

                      {/* Add Task Floating Button (sticky and fixed in position) */}
                      <Fab
                        color="primary"
                        aria-label="add"
                        sx={{
                          position: "sticky",
                          bottom: 20, // Distance from the bottom of the scroll container
                          left: 210, // Distance from the right edge of the scroll container
                          zIndex: 1, // Ensure the Fab is on top
                        }}
                        onClick={() => setOpenDialog(true)}
                      >
                        <AddIcon />
                      </Fab>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Calendar Card */}
            <Grid item sm={12} md={6}>
              <Card
                sx={{
                  height: "380px",
                  boxShadow: 3,
                  width: "300px",
                  backgroundImage:
                    "linear-gradient(to bottom, #ffffff, #f0f0f0)",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Calendar
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      minWidth: "280px",
                      // pl: { md: 2, xs: 0 },
                    }}
                  >
                    <Calendar
                      selectedDate={selectedDate}
                      onDateChange={handleDateChange}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Other sections remain unchanged */}
        <Grid item xs={12} lg={8}>
          <TicketTable />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              boxShadow: 3,
              backgroundImage: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
            }}
          >
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <AnnouncementsTable />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Description"
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={addTask}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StudentDashboard;
