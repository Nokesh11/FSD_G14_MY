import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Ticket data creation function
function createTicketData(serial, status, description, recipient) {
    return { serial, status, description, recipient };
}

// Pending and Completed ticket rows
const pendingRows = [
    createTicketData(1, 'Open', 'Issue with login', 'John Doe'),
    createTicketData(2, 'In Progress', 'Unable to reset password', 'Jane Smith'),
    createTicketData(4, 'Open', 'Feature request for new dashboard', 'Bob Lee'),
    createTicketData(6, 'Open', 'Performance issue in dashboard', 'David Lee'),
    createTicketData(7, 'In Progress', 'Login issue in mobile app', 'Mike Ross'),
];

const completedRows = [
    createTicketData(3, 'Closed', 'Bug in payment gateway', 'Alice Johnson'),
    createTicketData(5, 'Resolved', 'UI glitch on homepage', 'Charlie Brown'),
    createTicketData(8, 'Resolved', 'Performance optimization', 'Daniel James'),
];

// Main component with tabs
export default function TicketTableWithTabs() {
    const [tabIndex, setTabIndex] = React.useState(0);

    // Handle tab change
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    // Table rendering function
    const renderTable = (rows) => (
        <TableContainer component={Paper} sx={{ maxWidth: "50%", overflowY: 'auto', overflowX: 'clip' }}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="ticket table">
                <TableHead>
                    <TableRow>
                        <TableCell>Serial Number</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Recipient</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((ticket) => (
                        <TableRow
                            key={ticket.serial}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {ticket.serial}
                            </TableCell>
                            <TableCell align="right">{ticket.status}</TableCell>
                            <TableCell align="right">{ticket.description}</TableCell>
                            <TableCell align="right">{ticket.recipient}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="ticket tabs">
                <Tab label="Pending Tickets" />
                <Tab label="Completed Tickets" />
            </Tabs>

            {/* Render table based on selected tab */}
            {tabIndex === 0 && renderTable(pendingRows)}
            {tabIndex === 1 && renderTable(completedRows)}
        </Box>
    );
}
