import { Box, Grid } from '@mui/material';
import React from 'react';
import Sidebar from '../components/Sidebar';
import AttendanceChart from '../components/AttendanceChart';
import TicketTable from '../components/TicketTable';

function StudentDashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>

        <Grid item xs={12} md={10}>
          <Box spacing={5}>
            <AttendanceChart />
            <TicketTable />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentDashboard;
