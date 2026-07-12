import {
    DataGrid,
    GridActionsCellItem,
} from "@mui/x-data-grid";

import {
  Box,
  TextField,
  Button,
  Stack,
  InputAdornment,
} from "@mui/material";

import { Paper, Typography, Chip } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardToolbar from "./DashboardToolbar";

const rows = [
    {
        id: 1,
        customer: "Rahul Sharma",
        amount: "₹50,000",
        status: "Approved",
        date: "11 Jul 2026",
    },
    {
        id: 2,
        customer: "Priya Patel",
        amount: "₹75,000",
        status: "Pending",
        date: "10 Jul 2026",
    },
    {
        id: 3,
        customer: "Aman Verma",
        amount: "₹30,000",
        status: "Rejected",
        date: "09 Jul 2026",
    },
];

const columns = [
    {
        field: "customer",
        headerName: "Customer",
        flex: 1,
    },
    {
        field: "amount",
        headerName: "Amount",
        width: 140,
    },
    {
        field: "status",
        headerName: "Status",
        width: 160,

        renderCell: (params) => {
            const color =
                params.value === "Approved"
                    ? "success"
                    : params.value === "Pending"
                        ? "warning"
                        : "error";

            return (
                <Chip
                    label={params.value}
                    color={color}
                    size="small"
                />
            );
        },
    },
    {
        field: "date",
        headerName: "Date",
        width: 150,
    },
    {
        field: "actions",
        type: "actions",
        width: 110,

        getActions: () => [
            <GridActionsCellItem
                icon={<VisibilityIcon />}
                label="View"
            />,
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
            />,
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
            />,
        ],
    },
];

function LoanTable() {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid #e5e7eb",
            }}
        >
            <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
            >
                Recent Loan Applications
            </Typography>

            <DashboardToolbar />
            <div style={{ height: 420 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    sx={{
                        border: 0,

                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#f8fafc",
                            fontWeight: "bold",
                        },

                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#f9fbff",
                        },
                    }}
                />
            </div>
        </Paper>
    );
}

export default LoanTable;