import { Box } from '@mui/material'
import React from 'react'
import Sidebar from '../components/Sidebar'
import AttendanceChart from '../components/AttendanceChart'

function StudentDashboard() {
  return (
    <Box>
      {/* <Sidebar /> */}
      <div>
        <AttendanceChart />
      </div>
    </Box>
  )
}

export default StudentDashboard