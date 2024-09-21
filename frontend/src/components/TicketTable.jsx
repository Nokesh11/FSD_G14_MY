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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// Ticket data creation function
function createTicketData(serial, status, description, recipient) {
    return { serial, status, description, recipient };
}

// Initial pending and completed ticket rows
const initialPendingRows = [
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

// Main component with tabs and new ticket functionality
export default function TicketTableWithTabs() {
    const [tabIndex, setTabIndex] = React.useState(0);
    const [pendingRows, setPendingRows] = React.useState(initialPendingRows); // State for pending tickets
    const [openDialog, setOpenDialog] = React.useState(false); // State to manage dialog open/close
    const [newTicket, setNewTicket] = React.useState({ description: '', recipient: '' }); // State for new ticket input

    // Handle tab change
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    // Handle form input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTicket((prevTicket) => ({ ...prevTicket, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = () => {
        const newSerial = pendingRows.length + completedRows.length + 1;
        const newTicketData = createTicketData(newSerial, 'Open', newTicket.description, newTicket.recipient);
        setPendingRows([...pendingRows, newTicketData]); // Add new ticket to pending rows
        setOpenDialog(false); // Close dialog
        setNewTicket({ description: '', recipient: '' }); // Reset form
    };

    // Open and close dialog
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    // Table rendering function
    const renderTable = (rows) => (
        <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowY: 'auto', overflowX: 'auto' }}>
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
        <div style={styles.card}>
            <Box sx={{ width: '100%' }}>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="ticket tabs">
                    <Tab label="Pending Tickets" />
                    <Tab label="Completed Tickets" />
                </Tabs>

                {/* Render table based on selected tab */}
                {tabIndex === 0 && renderTable(pendingRows)}
                {tabIndex === 1 && renderTable(completedRows)}

                {/* New Ticket Button */}
                {tabIndex === 0 && (
                    <Button variant="contained" color="primary" onClick={handleOpenDialog} style={styles.newTicketButton}>
                        Add New Ticket
                    </Button>
                )}

                {/* Dialog for adding new ticket */}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Add New Ticket</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                            name="description"
                            value={newTicket.description}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            label="Recipient"
                            type="text"
                            fullWidth
                            name="recipient"
                            value={newTicket.recipient}
                            onChange={handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                        <Button onClick={handleSubmit} color="primary">Submit</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}

// Simple card styles
const styles = {
    card: {
        width: '51.5%',
        margin: '0.1rem',
        padding: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundImage: 'linear-gradient(to bottom, #ffffff, #f0f0f0)',
        overflowX: 'auto', // Add horizontal scroll
    },
    newTicketButton: {
        marginTop: '20px',
        float: 'right',
    },
};
