// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import Button from "@mui/material/Button";
// import { useState, useCallback } from "react";
// import { format, addDays } from "date-fns";

// export default function BasicEditingGrid() {
//   const [columns, setColumns] = useState(initialColumns);
//   const [rows, setRows] = useState(initialRows);

//   const addColumn = useCallback(() => {
//     const newDate = format(addDays(new Date(), columns.length), "dd/MM/yyyy");

//     const newColumn = {
//       field: newDate,
//       headerName: newDate,
//       width: 180,
//       editable: true, // Make sure this is set to true
//     };

//     setColumns((prevColumns) => [...prevColumns, newColumn]);

//     // Update existing rows to include the new column with default values
//     setRows((prevRows) =>
//       prevRows.map((row) => ({
//         ...row,
//         [newDate]: "", // Default value for the new column
//       }))
//     );
//   }, [columns.length]);

//   // Function to handle cell click events
//   const handleCellClick = (params) => {
//     console.log(
//       `Cell Clicked - Row ID: ${params.row.id}, Column Field: ${params.field}, Cell Value: ${params.value}`
//     );
//   };

//   // Function to handle cell edit commits
//   const handleCellEditCommit = (params) => {
//     const newValue = params.value; // New value from the edit
//     const rowId = params.row.id; // ID of the row being edited
//     const columnField = params.field; // The field being edited

//     // Find the old value before the edit
//     const oldRow = rows.find((row) => row.id === rowId);
//     const oldValue =
//       oldRow[columnField] !== undefined ? oldRow[columnField] : "N/A"; // Old value or 'N/A' if not set

//     // Default the new value to 0 if it is empty
//     const displayedNewValue = newValue === "" ? 0 : newValue;

//     // Log the relevant information
//     console.log(`Editing Row ID: ${rowId}, Column: ${columnField}`);
//     console.log(`Old Value: ${oldValue}, New Value: ${displayedNewValue}`);
//   };

//   return (
//     <div style={{ height: 300, width: "100%" }}>
//       <Button
//         variant="contained"
//         onClick={addColumn}
//         style={{ marginBottom: 16 }}
//       >
//         Add New Column (Date)
//       </Button>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         onCellClick={handleCellClick} // Attach the click handler
//         onCellEditStop={(params, event) => {
// 			console.log(params);
// 			handleCellEditCommit(params);
//         }}
//       />
//     </div>
//   );
// }

// // Initial column definitions
// const initialColumns = [
//   { field: "name", headerName: "Name", width: 180, editable: false }, // Only the name column
// ];

// // Initial row data with hardcoded names
// const initialRows = [
//   { id: 1, name: "Jon Snow" },
//   { id: 2, name: "Arya Stark" },
//   { id: 3, name: "Tyrion Lannister" },
// ];


import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useState, useCallback } from "react";
import { format, addDays } from "date-fns";

export default function BasicEditingGrid() {
  const [columns, setColumns] = useState(initialColumns);
  const [rows, setRows] = useState(initialRows);

  const addColumn = useCallback(() => {
    const newDate = format(addDays(new Date(), columns.length), "dd/MM/yyyy");

    const newColumn = {
      field: newDate,
      headerName: newDate,
      width: 180,
      editable: true, // Make sure this is set to true
    };

    setColumns((prevColumns) => [...prevColumns, newColumn]);

    // Update existing rows to include the new column with default values
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        [newDate]: "", // Default value for the new column
      }))
    );
  }, [columns.length]);

  // Function to handle cell click events
  const handleCellClick = (params) => {
    console.log(
      `Cell Clicked - Row ID: ${params.row.id}, Column Field: ${params.field}, Cell Value: ${params.value}`
    );
  };

  // Function to handle cell edit commits
  const handleCellEditCommit = (updatedRow) => {
    const rowId = updatedRow.id; // ID of the row being edited

    // Ensure the updatedRow contains the necessary structure
    if (!rowId) {
      console.error("Row ID is undefined. Cannot update row.");
      return; // Exit if row ID is not present
    }

    // Update the rows state with the new value
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === rowId) {
          return { ...row, ...updatedRow }; // Update the edited row
        }
        return row; // Return unchanged rows
      })
    );

    // Log the relevant information
    console.log(`Editing Row ID: ${rowId}`);
    console.log(`Updated Row Data:`, updatedRow);
  };

  // Handle errors during row updates
  const handleProcessRowUpdateError = (e) => {
    console.error("Error updating row:", e);
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <Button
        variant="contained"
        onClick={addColumn}
        style={{ marginBottom: 16 }}
      >
        Add New Column (Date)
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellClick={handleCellClick} // Attach the click handler
        processRowUpdate={handleCellEditCommit} // Handle row updates
        onProcessRowUpdateError={handleProcessRowUpdateError} // Handle errors
      />
    </div>
  );
}

// Initial column definitions
const initialColumns = [
  { field: "name", headerName: "Name", width: 180, editable: false }, // Only the name column
];

// Initial row data with hardcoded names
const initialRows = [
  { id: 1, name: "Jon Snow" },
  { id: 2, name: "Arya Stark" },
  { id: 3, name: "Tyrion Lannister" },
];
	