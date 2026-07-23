import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import StatusChip from "../../components/ui/StatusChip";
import ApproveRejectDialog from "../../components/loans/ApproveRejectDialog";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { getAllLoans } from "../../services/loanService";
import { useNavigate } from "react-router-dom";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [approveDialog, setApproveDialog] = useState(false);
  const [mode, setMode] = useState("approve");

  useEffect(() => {
    loadAssignedLoans();
  }, []);

  const loadAssignedLoans = async () => {
    try {
      setLoading(true);
      const res = await getAllLoans();
      setLoans(res.data.loans || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val) =>
    Number(val || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  const pendingCount = loans.filter((l) => l.status === "Pending" || l.status === "Assigned").length;
  const approvedCount = loans.filter((l) => l.status === "Approved").length;

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <PageHeader
          title="Loan Officer Underwriting Workbench"
          subtitle="Review assigned applications, perform credit verification, and issue sanction decisions"
          breadcrumbs={[{ label: "Officer Portal", path: "/employee/dashboard" }]}
        />

        {/* Top Staff Metrics */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Assigned Queue"
              value={pendingCount}
              icon={<AssignmentIndIcon />}
              color="#1565C0"
              subtitle="Applications to review"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Approved Applications"
              value={approvedCount}
              change="+14.5%"
              icon={<CheckCircleIcon />}
              color="#00C853"
              subtitle="Sanctioned by you"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Document Review"
              value="5 Tasks"
              icon={<PendingActionsIcon />}
              color="#F59E0B"
              subtitle="Awaiting KYC check"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Monthly Target"
              value="82%"
              icon={<EmojiEventsIcon />}
              color="#42A5F5"
              subtitle="24 of 30 Approvals"
              progress={82}
            />
          </Grid>
        </Grid>

        {/* Assigned Loans Table */}
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Assigned Applications Queue
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Perform risk assessment & take approval/rejection actions
              </Typography>
            </Box>
            <Chip label={`${loans.length} Total Loans`} color="primary" variant="outlined" size="small" />
          </Stack>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Borrower</TableCell>
                  <TableCell>Loan Amount</TableCell>
                  <TableCell>Interest Rate</TableCell>
                  <TableCell>Tenure</TableCell>
                  <TableCell>Monthly EMI</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loans.map((row) => (
                  <TableRow key={row._id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main", fontSize: "0.85rem", fontWeight: 700 }}>
                          {row.customer?.fullName ? row.customer.fullName[0] : "B"}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>{row.customer?.fullName || "Borrower"}</Typography>
                          <Typography variant="caption" color="text.secondary">{row.customer?.email}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell><Typography variant="body2" fontWeight={700}>{formatCurrency(row.loanAmount)}</Typography></TableCell>
                    <TableCell>{row.interestRate}%</TableCell>
                    <TableCell>{row.duration} Months</TableCell>
                    <TableCell><Typography variant="body2" fontWeight={700} color="success.main">{formatCurrency(row.emi)}</Typography></TableCell>
                    <TableCell><StatusChip status={row.status} size="small" /></TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="View Full File">
                          <IconButton size="small" color="primary" onClick={() => navigate(`/admin/loans/${row._id}`)}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Approve Loan">
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => {
                              setSelectedLoan({ id: row._id });
                              setMode("approve");
                              setApproveDialog(true);
                            }}
                          >
                            <CheckCircleIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Reject Loan">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => {
                              setSelectedLoan({ id: row._id });
                              setMode("reject");
                              setApproveDialog(true);
                            }}
                          >
                            <CancelIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Approve/Reject Modal Dialog */}
        <ApproveRejectDialog
          open={approveDialog}
          loan={selectedLoan}
          mode={mode}
          refresh={loadAssignedLoans}
          onClose={() => setApproveDialog(false)}
        />
      </Box>
    </DashboardLayout>
  );
}