import React from "react";
import { useTable } from "react-table";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";

// Ticket data creation function
function createTicketData(serial, status, description, recipient) {
  return { serial, status, description, recipient };
}

// Initial pending and completed ticket rows
const initialPendingRows = [
  createTicketData(1, "Open", "Issue with login", "John Doe"),
  createTicketData(2, "In Progress", "Unable to reset password", "Jane Smith"),
  createTicketData(4, "Open", "Feature request for new dashboard", "Bob Lee"),
  createTicketData(6, "Open", "Performance issue in dashboard", "David Lee"),
  createTicketData(7, "In Progress", "Login issue in mobile app", "Mike Ross"),
];

const completedRows = [
  createTicketData(3, "Closed", "Bug in payment gateway", "Alice Johnson"),
  createTicketData(5, "Resolved", "UI glitch on homepage", "Charlie Brown"),
  createTicketData(8, "Resolved", "Performance optimization", "Daniel James"),
  createTicketData(9, "Resolved", "Code optimization", "Charlie James"),
];

const columns = [
  {
    Header: "Serial Number",
    accessor: "serial", // accessor is the "key" in the data
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Recipient",
    accessor: "recipient",
  },
];

// Main component with tabs and new ticket functionality
export default function TicketTable() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [pendingRows, setPendingRows] = React.useState(initialPendingRows); // State for pending tickets
  const [openDialog, setOpenDialog] = React.useState(false); // State to manage dialog open/close
  const [newTicket, setNewTicket] = React.useState({
    description: "",
    recipient: "",
  }); // State for new ticket input

  // Media query to detect small screen
  const isSmallScreen = useMediaQuery("(max-width:730px)");

  // Handle tab change
  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  // Handle form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTicket((prevTicket) => ({ ...prevTicket, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const newSerial = pendingRows.length + completedRows.length + 1;
    const newTicketData = createTicketData(
      newSerial,
      "Open",
      newTicket.description,
      newTicket.recipient
    );
    setPendingRows([...pendingRows, newTicketData]); // Add new ticket to pending rows
    setOpenDialog(false); // Close dialog
    setNewTicket({ description: "", recipient: "" }); // Reset form
  };

  // Open and close dialog
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // Table component using useTable hook
  const TableComponent = ({ data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    });

    return (
      <table {...getTableProps()} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                    backgroundColor: "#f5f5f5",
                    textAlign: "left",
                    color: "black",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                        color: "black",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div style={styles.card}>
      {/* New Ticket Button */}
      {isSmallScreen ? (
        // Use IconButton with plus icon for small screens
        <IconButton
          onClick={handleOpenDialog}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000, // Ensures it's above other elements
            backgroundColor: "#904dd3", // Custom background color (purple)
            color: "#fff", // Custom icon color (white)
          }}
        >
          <AddIcon />
        </IconButton>
      ) : (
        // Full button for larger screens
        <Button
          variant="contained"
          onClick={handleOpenDialog}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000, // Ensures it's above other elements
            backgroundColor: "#904dd3", // Custom background color (purple)
            color: "#fff", // Custom text color (white)
            borderRadius: "5px", // Example: custom border radius
          }}
        >
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
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Render Tabs */}
      <div>
        <Button
          onClick={() => handleTabChange(0)}
          style={{
            backgroundColor: tabIndex === 0 ? "#904dd3" : "#f5f5f5",
            color: tabIndex === 0 ? "#fff" : "#000",
            marginRight: "10px",
          }}
        >
          Pending Tickets
        </Button>
        <Button
          onClick={() => handleTabChange(1)}
          style={{
            backgroundColor: tabIndex === 1 ? "#904dd3" : "#f5f5f5",
            color: tabIndex === 1 ? "#fff" : "#000",
          }}
        >
          Completed Tickets
        </Button>
      </div>

      {/* Render Table based on tab index */}
      {tabIndex === 0 && <TableComponent data={pendingRows} />}
      {tabIndex === 1 && <TableComponent data={completedRows} />}
    </div>
  );
}

// Styles for card
const styles = {
  card: {
    width: "100%",
    height: "100%",
    position: "relative",
    padding: "20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    backgroundImage: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
  },
};
