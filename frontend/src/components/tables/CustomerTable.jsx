import { useState } from "react";
import {
  Paper,
  IconButton,
  Tooltip,
  Stack,
  Avatar,
  Box,
  Typography,
  Chip,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CloseIcon from "@mui/icons-material/Close";

import StatusChip from "../ui/StatusChip";

export default function CustomerTable({ customers = [], onEdit, onDelete }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const columns = [
    {
      field: "fullName",
      headerName: "Customer Borrower",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ height: "100%" }}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main", fontSize: "0.9rem", fontWeight: 700 }}>
            {params.value ? params.value[0].toUpperCase() : "C"}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={700} leading={1.2}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              KYC Verified
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: "email",
      headerName: "Email Address",
      flex: 1.2,
      renderCell: (params) => (
        <Typography variant="body2" color="text.primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.value || "+91 98765 43210"}
        </Typography>
      ),
    },
    {
      field: "creditScore",
      headerName: "CIBIL Score",
      width: 140,
      renderCell: () => (
        <Chip
          icon={<VerifiedUserIcon sx={{ fontSize: "14px !important" }} />}
          label="750+ (Excellent)"
          size="small"
          color="success"
          variant="outlined"
          sx={{ height: 22, fontSize: "0.725rem", fontWeight: 700 }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Account Status",
      width: 140,
      renderCell: (params) => (
        <StatusChip status={params.row.isActive ? "Active" : "Pending"} size="small" />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ height: "100%" }}>
          <Tooltip title="View Customer Profile">
            <IconButton
              size="small"
              color="primary"
              onClick={() => {
                setSelectedCustomer(params.row);
                setProfileOpen(true);
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit Customer">
            <IconButton size="small" color="warning" onClick={() => onEdit?.(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Customer">
            <IconButton size="small" color="error" onClick={() => onDelete?.(params.row)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const rows = customers.map((customer, idx) => ({
    id: customer._id || `cust-${idx}`,
    fullName: customer.fullName || "Customer User",
    email: customer.email || "customer@bank-u.com",
    phone: customer.phone || "+91 98765 43210",
    role: customer.role || "customer",
    isActive: customer.isActive ?? true,
    raw: customer,
  }));

  return (
    <>
      <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": { borderColor: "divider" },
            "& .MuiDataGrid-columnHeader": {
              bgcolor: (theme) => (theme.palette.mode === "dark" ? "#1E293B" : "#F8FAFC"),
              fontWeight: 700,
            },
          }}
        />
      </Paper>

      {/* Customer Profile Side Drawer */}
      <Drawer anchor="right" open={profileOpen} onClose={() => setProfileOpen(false)}>
        <Box sx={{ width: { xs: 320, sm: 420 }, p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Customer Borrower Profile
            </Typography>
            <IconButton onClick={() => setProfileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          {selectedCustomer && (
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main", fontSize: "1.5rem", fontWeight: 700 }}>
                  {selectedCustomer.fullName[0]}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700}>{selectedCustomer.fullName}</Typography>
                  <Typography variant="body2" color="text.secondary">{selectedCustomer.email}</Typography>
                  <Chip label="Verified Account" size="small" color="success" sx={{ mt: 0.5, height: 20, fontSize: "0.65rem" }} />
                </Box>
              </Stack>

              <Paper sx={{ p: 2, borderRadius: 3, bgcolor: "background.subtle" }}>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>PORTFOLIO SNAPSHOT</Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Active Loans</Typography>
                    <Typography variant="h6" fontWeight={700} color="primary.main">2 Loans</Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="caption" color="text.secondary">Total Exposure</Typography>
                    <Typography variant="h6" fontWeight={700} color="success.main">₹17.50L</Typography>
                  </Box>
                </Stack>
              </Paper>

              <Box>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>Borrower Loan History</Typography>
                <List disablePadding>
                  <ListItem disableGutters sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
                    <AccountBalanceWalletIcon color="primary" sx={{ mr: 1.5 }} />
                    <ListItemText
                      primary={<Typography variant="subtitle2">₹12.00L Home Loan</Typography>}
                      secondary="Approved • EMI ₹24,500/mo"
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <AccountBalanceWalletIcon color="success" sx={{ mr: 1.5 }} />
                    <ListItemText
                      primary={<Typography variant="subtitle2">₹5.00L Personal Loan</Typography>}
                      secondary="Active • EMI ₹12,800/mo"
                    />
                  </ListItem>
                </List>
              </Box>

              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                Manage Account
              </Button>
            </Stack>
          )}
        </Box>
      </Drawer>
    </>
  );
}