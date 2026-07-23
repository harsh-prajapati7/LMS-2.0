import {
  Paper,
  Stack,
  Avatar,
  Box,
  Typography,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";

export default function EmployeeTable({ employees = [], onEdit, onDelete }) {
  const columns = [
    {
      field: "fullName",
      headerName: "Officer Name",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ height: "100%" }}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: "secondary.main", fontSize: "0.9rem", fontWeight: 700 }}>
            {params.value ? params.value[0].toUpperCase() : "E"}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={700} leading={1.2}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Senior Underwriter
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
        <Typography variant="body2">{params.value}</Typography>
      ),
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">{params.value || "+91 98765 11223"}</Typography>
      ),
    },
    {
      field: "targetProgress",
      headerName: "Monthly Target (80%)",
      flex: 1.3,
      renderCell: (params) => (
        <Box sx={{ width: "100%" }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
            <Typography variant="caption" fontWeight={600}>{params.row.approvals || 18} / 25 Loans</Typography>
            <Typography variant="caption" fontWeight={700} color="primary.main">72%</Typography>
          </Stack>
          <LinearProgress variant="determinate" value={72} sx={{ height: 6, borderRadius: 3 }} />
        </Box>
      ),
    },
    {
      field: "role",
      headerName: "Role Badge",
      width: 140,
      renderCell: (params) => (
        <Chip
          icon={<StarIcon sx={{ fontSize: "14px !important" }} />}
          label={(params.value || "employee").toUpperCase()}
          size="small"
          color="primary"
          sx={{ height: 22, fontSize: "0.7rem", fontWeight: 700 }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ height: "100%" }}>
          <Tooltip title="Edit Officer">
            <IconButton size="small" color="warning" onClick={() => onEdit?.(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Officer">
            <IconButton size="small" color="error" onClick={() => onDelete?.(params.row)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const rows = employees.map((emp, idx) => ({
    id: emp._id || `emp-${idx}`,
    fullName: emp.fullName || "Loan Officer",
    email: emp.email || "officer@bank-u.com",
    phone: emp.phone || "+91 98765 11223",
    role: emp.role || "employee",
    approvals: 15 + (idx * 3),
    raw: emp,
  }));

  return (
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
  );
}