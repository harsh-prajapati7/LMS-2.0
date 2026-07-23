import { useNavigate } from "react-router-dom";
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
  LinearProgress,
} from "@mui/material";

import DashboardHeader from "./DashboardHeader";
import StatCard from "../ui/StatCard";
import StatusChip from "../ui/StatusChip";
import LoanChart from "./charts/LoanChart";
import LoanDistribution from "./charts/LoanDistribution";
import QuickActions from "./widgets/QuickActions";
import ActivityTimeline from "./widgets/ActivityTimeline";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const employeePerfData = [
  { name: "Anita S.", approvals: 24, target: 30 },
  { name: "Rahul V.", approvals: 32, target: 35 },
  { name: "Suresh P.", approvals: 19, target: 25 },
  { name: "Neha K.", approvals: 28, target: 30 },
];

export default function DashboardContent({ data }) {
  const navigate = useNavigate();

  const totalLoans = data?.dashboard?.totalLoans ?? 128;
  const pendingLoans = data?.dashboard?.pendingLoans ?? 18;
  const approvedLoans = data?.dashboard?.approvedLoans ?? 86;
  const rejectedLoans = data?.dashboard?.rejectedLoans ?? 12;
  const totalCustomers = data?.dashboard?.totalCustomers ?? 240;

  const formatCurrency = (val) =>
    Number(val || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <DashboardHeader />

      {/* 8 Top Executive KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Loans"
            value={totalLoans}
            change="+14.2%"
            isPositive={true}
            icon={<AccountBalanceWalletIcon />}
            color="#6366F1"
            subtitle="All time portfolio"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Loans"
            value={approvedLoans + 10}
            change="+8.5%"
            isPositive={true}
            icon={<TrendingUpIcon />}
            color="#10B981"
            subtitle="Earning interest"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Approved Loans"
            value={approvedLoans}
            change="+12.0%"
            isPositive={true}
            icon={<CheckCircleOutlinedIcon />}
            color="#10B981"
            subtitle="Approved this quarter"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Loans"
            value={pendingLoans}
            change="-3.1%"
            isPositive={true}
            icon={<PendingActionsIcon />}
            color="#F59E0B"
            subtitle="Under review"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Rejected Loans"
            value={rejectedLoans}
            change="-1.5%"
            isPositive={true}
            icon={<CancelOutlinedIcon />}
            color="#F43F5E"
            subtitle="Risk criteria failed"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value="₹24.85L"
            change="+18.4%"
            isPositive={true}
            icon={<MonetizationOnOutlinedIcon />}
            color="#10B981"
            subtitle="Interest & fees"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Monthly EMI Collection"
            value="₹4.60L"
            change="+9.2%"
            isPositive={true}
            icon={<CalendarMonthOutlinedIcon />}
            color="#06B6D4"
            subtitle="Current month target"
            progress={82}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Customer Base Growth"
            value={totalCustomers}
            change="+15.8%"
            isPositive={true}
            icon={<TrendingUpIcon />}
            color="#6366F1"
            subtitle="Verified borrowers"
          />
        </Grid>
      </Grid>

      {/* Main Analytics Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <LoanChart />
        </Grid>

        <Grid item xs={12} lg={4}>
          <LoanDistribution />
        </Grid>
      </Grid>

      {/* Employee Performance & Loan Approval Rate Gauge */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 4, height: "100%" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Box>
                <Typography variant="h6" fontWeight={700} color="text.primary">
                  Employee Performance
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Monthly loan approvals vs assigned target
                </Typography>
              </Box>
              <Chip label="Top Staff" size="small" color="success" />
            </Stack>

            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={employeePerfData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.2)" />
                <XAxis dataKey="name" tickLine={false} style={{ fontSize: "12px" }} />
                <YAxis tickLine={false} style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="approvals" fill="#1565C0" radius={[6, 6, 0, 0]} name="Approvals" />
                <Bar dataKey="target" fill="#42A5F5" radius={[6, 6, 0, 0]} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 4, height: "100%" }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={700} color="text.primary">
                System Approval Efficiency
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Overall loan approval rate & processing speed metrics
              </Typography>
            </Box>

            <Stack spacing={3}>
              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="body2" fontWeight={600}>Approval Rate</Typography>
                  <Typography variant="body2" fontWeight={700} color="success.main">78.4%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={78.4} color="success" sx={{ height: 8, borderRadius: 4 }} />
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="body2" fontWeight={600}>Avg SLA Turnaround</Typography>
                  <Typography variant="body2" fontWeight={700} color="primary.main">1.8 Days</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={85} color="primary" sx={{ height: 8, borderRadius: 4 }} />
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="body2" fontWeight={600}>KYC Compliance Rate</Typography>
                  <Typography variant="body2" fontWeight={700} color="secondary.main">94.2%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={94.2} color="secondary" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Activity + Quick Actions + Table Grid */}
      <Grid container spacing={3}>
        {/* Recent Applications Data Table */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
              <Box>
                <Typography variant="h6" fontWeight={700} color="text.primary">
                  Recent Applications
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Latest loan requests submitted to the system
                </Typography>
              </Box>
              <Button
                variant="text"
                size="small"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/admin/loans")}
              >
                View All Loans
              </Button>
            </Stack>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Borrower</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { name: "Rajesh Kumar", email: "rajesh@gmail.com", amount: 500000, duration: "24m", status: "Pending" },
                    { name: "Priya Sharma", email: "priya@gmail.com", amount: 1200000, duration: "36m", status: "Approved" },
                    { name: "Vikram Singh", email: "vikram@gmail.com", amount: 350000, duration: "12m", status: "Assigned" },
                    { name: "Ananya Roy", email: "ananya@gmail.com", amount: 800000, duration: "24m", status: "Rejected" },
                  ].map((row, idx) => (
                    <TableRow key={idx} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: "0.8rem", fontWeight: 700 }}>
                            {row.name[0]}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight={600}>{row.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{row.email}</Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={700}>{formatCurrency(row.amount)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{row.duration}</Typography>
                      </TableCell>
                      <TableCell>
                        <StatusChip status={row.status} size="small" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Quick Actions & Timeline */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            <QuickActions />
            <ActivityTimeline />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}