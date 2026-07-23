import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Chip,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";

import AnalyticsIcon from "@mui/icons-material/Analytics";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import SpeedIcon from "@mui/icons-material/Speed";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const yieldData = [
  { month: "Q1 25", interest: 1400000, principal: 4500000 },
  { month: "Q2 25", interest: 1800000, principal: 5200000 },
  { month: "Q3 25", interest: 2200000, principal: 6100000 },
  { month: "Q4 25", interest: 2700000, principal: 7800000 },
  { month: "Q1 26", interest: 3200000, principal: 8900000 },
];

const riskData = [
  { name: "Low Risk (CIBIL 750+)", value: 65, color: "#00C853" },
  { name: "Moderate Risk (650-749)", value: 25, color: "#F59E0B" },
  { name: "High Risk (<650)", value: 10, color: "#EF4444" },
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <PageHeader
          title="Portfolio Analytics & Risk Intelligence"
          subtitle="Real-time forecasting, interest yield performance, and credit risk distribution"
          breadcrumbs={[{ label: "Analytics", path: "/admin/analytics" }]}
        />

        {/* Analytics Top Stats */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Net Yield Margin"
              value="11.4% p.a."
              change="+1.2%"
              icon={<ShowChartIcon />}
              color="#1565C0"
              subtitle="Portfolio interest yield"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Non-Performing Assets"
              value="0.84%"
              change="-0.15%"
              isPositive={true}
              icon={<PieChartIcon />}
              color="#00C853"
              subtitle="Industry lowest NPA"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Predictive Sanctions"
              value="₹45.00L"
              change="+22.0%"
              icon={<AnalyticsIcon />}
              color="#42A5F5"
              subtitle="Forecast for next month"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Average Risk Score"
              value="Low Risk"
              icon={<SpeedIcon />}
              color="#F59E0B"
              subtitle="Score 765 / 900"
            />
          </Grid>
        </Grid>

        {/* Interest Yield & Risk Charts */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, borderRadius: 4, height: "100%" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Quarterly Interest Yield vs Principal Recovery
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Comparative growth of loan repayments & interest income
                  </Typography>
                </Box>
                <Chip label="Real-time Stream" color="primary" size="small" />
              </Stack>

              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={yieldData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorInt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00C853" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00C853" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.2)" />
                  <XAxis dataKey="month" style={{ fontSize: "12px" }} />
                  <YAxis style={{ fontSize: "12px" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#0F172A", color: "#fff", borderRadius: 12 }} />
                  <Area type="monotone" dataKey="interest" name="Interest Income (₹)" stroke="#00C853" fill="url(#colorInt)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, borderRadius: 4, height: "100%" }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                  Borrower Credit Risk Segmentation
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  CIBIL score tier distribution
                </Typography>
              </Box>

              <ResponsiveContainer width="100%" height={290}>
                <PieChart>
                  <Pie data={riskData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value">
                    {riskData.map((e, idx) => (
                      <Cell key={idx} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#0F172A", color: "#fff", borderRadius: 12 }} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
