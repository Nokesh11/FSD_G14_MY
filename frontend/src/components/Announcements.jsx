import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Info } from "lucide-react";

// Announcement data creation function
function createAnnouncementData(text) {
  return { text };
}

// Initial announcement rows
const initialAnnouncements = [
  createAnnouncementData("School Closed on September 20, 2024"),
  createAnnouncementData("Parent-Teacher Meeting on September 25, 2024"),
  createAnnouncementData("Field Trip to Science Museum on September 30, 2024"),
  createAnnouncementData("Exam Schedule Released on October 5, 2024"),
  createAnnouncementData("New Sports Facility Opening on October 10, 2024"),
];

export default function AnnouncementsTable() {
  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <TableContainer
        component={Paper}
        sx={{ overflowY: "auto", marginTop: 1 }}
      >
        <Table stickyHeader aria-label="announcements table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    gap: 1,
                  }}
                >
                  <Info />
                  Announcements
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {initialAnnouncements.map((announcement, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{announcement.text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
