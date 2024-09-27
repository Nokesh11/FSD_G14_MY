import React from "react";
import { useTable } from "react-table";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";

// Ticket data creation function
function createTicketData(serial, status, title, description, recipient) {
  return { serial, status, title, description, recipient };
}

// Initial pending and completed ticket rows
const initialPendingRows = [
  createTicketData(1, "Open", "Login Issue", "Issue with login on the website", "John Doe"),
  createTicketData(2, "In Progress", "Password Reset Problem", "Unable to reset password from the profile page", "Jane Smith"),
  createTicketData(4, "Open", "Feature Request", "Request for a new dashboard layout for better performance", "Bob Lee"),
  createTicketData(6, "Open", "Performance Issue", "Dashboard is lagging when using on mobile devices", "David Lee"),
  createTicketData(7, "In Progress", "App Login Issue", "Users facing login issues specifically in the mobile app", "Mike Ross"),
];

const completedRows = [
  createTicketData(3, "Closed", "Payment Gateway Bug", "Critical issue in the payment gateway during transactions", "Alice Johnson"),
  createTicketData(5, "Resolved", "UI Glitch", "UI glitch observed on homepage during user interactions", "Charlie Brown"),
  createTicketData(8, "Resolved", "Performance Optimization", "Performance issues optimized successfully", "Daniel James"),
  createTicketData(9, "Resolved", "Code Optimization", "Redundant code removed and refactored for better speed", "Charlie James"),
];

const columns = [
  {
    Header: "Serial Number",
    accessor: "serial",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Title",
    accessor: "title",
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
  const [pendingRows, setPendingRows] = React.useState(initialPendingRows);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [newTicket, setNewTicket] = React.useState({
    title: "",
    description: "",
    recipient: "",
  });

  const isSmallScreen = useMediaQuery("(max-width:730px)");

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTicket((prevTicket) => ({ ...prevTicket, [name]: value }));
  };

  const handleSubmit = () => {
    const newSerial = pendingRows.length + completedRows.length + 1;
    const newTicketData = createTicketData(
      newSerial,
      "Open",
      newTicket.title,
      newTicket.description,
      newTicket.recipient
    );
    setPendingRows([...pendingRows, newTicketData]);
    setOpenDialog(false);
    setNewTicket({ title: "", description: "", recipient: "" });
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const TableComponent = ({ data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    });

    return (
      <table {...getTableProps()} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
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
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
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
      {isSmallScreen ? (
        <IconButton
          onClick={handleOpenDialog}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            backgroundColor: "#904dd3",
            color: "#fff",
          }}
        >
          <AddIcon />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          onClick={handleOpenDialog}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            backgroundColor: "#904dd3",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          Add New Ticket
        </Button>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Ticket</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            name="title"
            value={newTicket.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4} // Number of rows for multiline text
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

      {tabIndex === 0 && <TableComponent data={pendingRows} />}
      {tabIndex === 1 && <TableComponent data={completedRows} />}
    </div>
  );
}

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
