import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  IconButton,
  Tooltip,
  Stack,
  Avatar,
  Box,
  Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import AssignEmployeeDialog from "./AssignEmployeeDialog";
import ApproveRejectDialog from "./ApproveRejectDialog";
import StatusChip from "../ui/StatusChip";
import { DeleteDialog } from "../ui/Dialogs";

export default function LoanTable({ loans = [], loading = false, refresh }) {
  const navigate = useNavigate();

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [assignDialog, setAssignDialog] = useState(false);
  const [approveDialog, setApproveDialog] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [mode, setMode] = useState("approve");

  const formatCurrency = (amount) =>
    Number(amount || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  const rows = loans.map((loan) => ({
    id: loan._id,
    customer: loan.customer?.fullName || "Unassigned Customer",
    customerEmail: loan.customer?.email || "",
    employee: loan.employee?.fullName || "Not Assigned",
    loanAmount: loan.loanAmount,
    interestRate: loan.interestRate,
    duration: loan.duration,
    emi: loan.emi,
    status: loan.status,
    raw: loan,
  }));

  const columns = [
    {
      field: "customer",
      headerName: "Customer Borrower",
      flex: 1.4,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ height: "100%" }}>
          <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main", fontSize: "0.85rem", fontWeight: 700 }}>
            {params.row.customer[0]}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={600} leading={1.2}>
              {params.row.customer}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap display="block">
              {params.row.customerEmail}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: "employee",
      headerName: "Assigned Officer",
      flex: 1.2,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={500} color={params.value === "Not Assigned" ? "text.disabled" : "text.primary"}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "loanAmount",
      headerName: "Loan Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={700} color="primary.main">
          {formatCurrency(params.value)}
        </Typography>
      ),
    },
    {
      field: "interestRate",
      headerName: "Interest",
      width: 110,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={600}>
          {params.value}% p.a.
        </Typography>
      ),
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 110,
      renderCell: (params) => (
        <Typography variant="body2">{params.value} Months</Typography>
      ),
    },
    {
      field: "emi",
      headerName: "Monthly EMI",
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={700} color="success.main">
          {formatCurrency(params.value)}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => <StatusChip status={params.value} size="small" />,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 260,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ height: "100%" }}>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              color="primary"
              onClick={() => navigate(`/admin/loans/${params.row.id}`)}
              sx={{ bgcolor: "primary.light", color: "primary.main", "&:hover": { bgcolor: "primary.main", color: "#fff" } }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Assign Employee">
            <IconButton
              size="small"
              color="info"
              onClick={() => {
                setSelectedLoan(params.row);
                setAssignDialog(true);
              }}
              sx={{ bgcolor: "info.light", opacity: 0.9 }}
            >
              <AssignmentIndIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Approve">
            <IconButton
              size="small"
              color="success"
              onClick={() => {
                setSelectedLoan(params.row);
                setMode("approve");
                setApproveDialog(true);
              }}
              sx={{ bgcolor: "success.light", opacity: 0.9 }}
            >
              <CheckCircleIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reject">
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                setSelectedLoan(params.row);
                setMode("reject");
                setApproveDialog(true);
              }}
              sx={{ bgcolor: "error.light", opacity: 0.9 }}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                setSelectedLoan(params.row);
                setDeleteModal(true);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Paper elevation={0} sx={{ mt: 2, borderRadius: 4, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": {
              py: 1.5,
              borderColor: "divider",
            },
            "& .MuiDataGrid-columnHeader": {
              bgcolor: (theme) => (theme.palette.mode === "dark" ? "#1E293B" : "#F8FAFC"),
              fontWeight: 700,
            },
          }}
        />
      </Paper>

      <AssignEmployeeDialog
        open={assignDialog}
        loan={selectedLoan}
        refresh={refresh}
        onClose={() => {
          setAssignDialog(false);
          setSelectedLoan(null);
        }}
      />

      <ApproveRejectDialog
        open={approveDialog}
        loan={selectedLoan}
        mode={mode}
        refresh={refresh}
        onClose={() => {
          setApproveDialog(false);
          setSelectedLoan(null);
        }}
      />

      <DeleteDialog
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => {
          setDeleteModal(false);
          if (refresh) refresh();
        }}
        itemName="Loan Application"
      />
    </>
  );
}