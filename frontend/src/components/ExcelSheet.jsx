import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useState, useCallback } from 'react';
import { format, addDays } from 'date-fns';
import axios from 'axios'; // Ensure axios is installed

export default function BasicEditingGrid() {
  const [columns, setColumns] = useState(initialColumns);
  const [rows, setRows] = useState(initialRows);

  const addColumn = useCallback(() => {
    const newDate = format(addDays(new Date(), columns.length), 'dd/MM/yyyy');

    const newColumn = {
      field: newDate,
      headerName: newDate,
      width: 180,
      editable: true,
    };

    setColumns((prevColumns) => [...prevColumns, newColumn]);

    // Update existing rows to include the new column with default values
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        [newDate]: '', // Default value for the new column
      }))
    );
  }, [columns.length]);

  // Function to handle cell edit commits
  const handleCellEditCommit = async (params) => {
	console.log(params);
    const studentName = params.row.name; // Get student name
    const date = params.field; // Get the date (column field)
    const newValue = params.value; // Get the new value

    console.log(`Student Name: ${studentName}, Date: ${date}, New Value: ${newValue}`);

    // Example request to backend
    try {
      await axios.post('/api/update', {
        studentName,
        date,
        newValue,
      });
      console.log('Data sent to the backend successfully');
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
  };

  return (
    <div style={{ height: 400, width: '100%', padding: '16px', backgroundColor: '#ffffff' }}>
      <Button
        variant="contained"
        onClick={addColumn}
        style={{ marginBottom: 16, backgroundColor: '#1976d2', color: '#ffffff' }}
      >
        Add New Column (Date)
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellEditCommit={handleCellEditCommit} // Attach the edit commit handler
        sx={{
          '& .MuiDataGrid-root': {
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#1976d2',
            color: '#000000',
            fontWeight: 'bold',
            borderBottom: '2px solid #e0e0e0',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e0e0e0',
            padding: '8px',
            color: '#333333',
          },
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#f9f9f9',
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#ffffff',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#e0f7fa',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '2px solid #e0e0e0',
            backgroundColor: '#f1f1f1',
          },
        }}
      />
    </div>
  );
}

// Initial column definitions
const initialColumns = [
  { field: 'name', headerName: 'Name', width: 180, editable: false },
];

// Initial row data with hardcoded names
const initialRows = [
  { id: 1, name: 'Jon Snow' },
  { id: 2, name: 'Arya Stark' },
  { id: 3, name: 'Tyrion Lannister' },
];
