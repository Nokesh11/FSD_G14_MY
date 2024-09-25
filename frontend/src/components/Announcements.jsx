import React from "react";
import { useTable } from "react-table";
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
} from "@mui/material";
import { Info } from "lucide-react";

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
  // Define the columns
  const columns = React.useMemo(
    () => [
      {
        Header: "Announcements",
        accessor: "text",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: initialAnnouncements,
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundImage: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
        border: "none",
        overflow: "scroll"
      }}
    >
      <TableContainer component={Paper} sx={{ overflowY: "auto", marginTop: 1 }}>
        <Table stickyHeader {...getTableProps()} aria-label="announcements table">
          <TableHead>
            {headerGroups.map((headerGroup, headerIndex) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={`header-group-${headerIndex}`}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <TableCell {...column.getHeaderProps()} key={`column-${columnIndex}`}>
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
                      {column.render("Header")}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} key={row.id || `row-${rowIndex}`}>
                  {row.cells.map((cell, cellIndex) => (
                    <TableCell {...cell.getCellProps()} key={cell.column.id || `cell-${cellIndex}`}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
