import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import StatusChip from "../../components/ui/StatusChip";
import EMICalculator from "../../components/loans/EMICalculator";
import LoanForm from "../../components/loans/LoanForm";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import PaymentIcon from "@mui/icons-material/Payment";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import { useAuth } from "../../context/AuthContext";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [openApplyModal, setOpenApplyModal] = useState(false);

  const formatCurrency = (val) =>
    Number(val || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <PageHeader
          title={`Welcome Back, ${user?.fullName || "Borrower"} 👋`}
          subtitle="Customer Self-Service Banking Portal & EMI Management"
          breadcrumbs={[{ label: "Borrower Dashboard", path: "/customer/dashboard" }]}
          action={
            <Button
              variant="contained"
              startIcon={<AddCircleOutlinedIcon />}
              onClick={() => setOpenApplyModal(true)}
            >
              Apply For New Loan
            </Button>
          }
        />

        {/* Customer KPI Summary */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Loan Balance"
              value="₹5,00,000"
              icon={<AccountBalanceWalletIcon />}
              color="#1565C0"
              subtitle="Personal Loan #L-8821"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Next EMI Due Date"
              value="05 Aug 2026"
              icon={<CalendarMonthIcon />}
              color="#F59E0B"
              subtitle="Auto-Debit Enabled"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Monthly EMI Amount"
              value="₹14,500"
              icon={<PaymentIcon />}
              color="#00C853"
              subtitle="18 of 24 EMIs left"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="CIBIL Credit Score"
              value="765"
              icon={<VerifiedUserIcon />}
              color="#42A5F5"
              subtitle="Excellent Standing"
            />
          </Grid>
        </Grid>

        {/* Active Loan Details & Repayment Calendar */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Active Personal Loan (#L-8821)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Sanctioned on 15 Feb 2025 • Sanctioned Interest Rate: 10.5% p.a.
                  </Typography>
                </Box>
                <StatusChip status="Approved" />
              </Stack>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="text.secondary">Sanctioned Amount</Typography>
                  <Typography variant="subtitle1" fontWeight={700}>₹5,00,000</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="text.secondary">Tenure</Typography>
                  <Typography variant="subtitle1" fontWeight={700}>24 Months</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="text.secondary">Total Paid</Typography>
                  <Typography variant="subtitle1" fontWeight={700} color="success.main">₹87,000</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="text.secondary">Remaining Principal</Typography>
                  <Typography variant="subtitle1" fontWeight={700} color="primary.main">₹4,13,000</Typography>
                </Grid>
              </Grid>

              <Button variant="contained" color="success" size="large" fullWidth startIcon={<PaymentIcon />}>
                Pay Upcoming EMI Now (₹14,500)
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <EMICalculator />
          </Grid>
        </Grid>

        {/* Repayment History Table & Documents */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                EMI Payment History
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Transaction ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Payment Mode</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { txId: "TXN-99821", date: "05 Jul 2026", amount: 14500, mode: "UPI AutoPay", status: "Approved" },
                      { txId: "TXN-98420", date: "05 Jun 2026", amount: 14500, mode: "NetBanking", status: "Approved" },
                      { txId: "TXN-97104", date: "05 May 2026", amount: 14500, mode: "Debit Card", status: "Approved" },
                    ].map((row, i) => (
                      <TableRow key={i}>
                        <TableCell><Typography variant="subtitle2" fontWeight={600}>{row.txId}</Typography></TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell><Typography variant="body2" fontWeight={700}>{formatCurrency(row.amount)}</Typography></TableCell>
                        <TableCell>{row.mode}</TableCell>
                        <TableCell><StatusChip status={row.status} size="small" /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                My Verified Documents
              </Typography>
              <Stack spacing={1.5}>
                {[
                  { name: "Aadhaar Card (KYC)", date: "15 Jan 2025" },
                  { name: "PAN Card", date: "15 Jan 2025" },
                  { name: "Loan Agreement PDF", date: "15 Feb 2025" },
                ].map((doc, idx) => (
                  <Paper key={idx} variant="outlined" sx={{ p: 1.5, borderRadius: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <DescriptionIcon color="primary" />
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>{doc.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{doc.date}</Typography>
                        </Box>
                      </Stack>
                      <Button size="small">Download</Button>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Apply Loan Modal Form */}
        <LoanForm
          open={openApplyModal}
          handleClose={() => setOpenApplyModal(false)}
        />
      </Box>
    </DashboardLayout>
  );
}