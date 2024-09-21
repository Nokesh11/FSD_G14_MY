import { Box, Grid } from '@mui/material';
import React from 'react';
import Sidebar from '../components/Sidebar';
import AttendanceChart from '../components/AttendanceChart';
import TicketTable from '../components/TicketTable';

function StudentDashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* Sidebar takes 2 out of 12 grid spaces */}
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>

        {/* Main content takes the remaining 10 out of 12 grid spaces */}
        <Grid item xs={12} md={10}>
          <Box>
            <AttendanceChart />
            <TicketTable />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentDashboard;
