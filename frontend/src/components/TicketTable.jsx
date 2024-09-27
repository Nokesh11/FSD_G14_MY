import React from "react";
import axios from "axios";
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

function createTicketData(serial, status, title, description, recipient) {
  return { serial, status, title, description, recipient };
}

const initialPendingRows = [
  createTicketData(1, "Open", "Login Issue", "Issue with login on the website", "John Doe"),
  createTicketData(2, "In Progress", "Password Reset Problem", "Unable to reset password from the profile page", "Jane Smith"),
  createTicketData(4, "Open", "Feature Request", "Request for a new dashboard layout for better performance", "Bob Lee"),
];

const completedRows = [
  createTicketData(3, "Closed", "Payment Gateway Bug", "Critical issue in the payment gateway during transactions", "Alice Johnson"),
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

  // Updated handleSubmit function with axios POST request to database
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/ticket/create-ticket`, {body: newTicket.description, toID: newTicket.recipient, title: newTicket.title});

      // After successful POST request, update the pendingRows state with the new ticket
      const newSerial = pendingRows.length + completedRows.length + 1;
      const newTicketData = createTicketData(
        newSerial,
        "Open",
        response.data.title,
        response.data.description,
        response.data.recipient
      );

      setPendingRows([...pendingRows, newTicketData]);
      setOpenDialog(false);
      setNewTicket({ title: "", description: "", recipient: "" });
    } catch (error) {
      console.error("Error adding new ticket:", error);
    }
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
                {row.cells.map((cell) => (
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
                ))}
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
            rows={4}
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
    backgroundImage: "linear",
  },
};
