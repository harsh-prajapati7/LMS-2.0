import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Paper, Typography, Box, Stack, Chip } from "@mui/material";

const defaultData = [
  { month: "Jan", loans: 28, revenue: 120000 },
  { month: "Feb", loans: 42, revenue: 185000 },
  { month: "Mar", loans: 36, revenue: 160000 },
  { month: "Apr", loans: 58, revenue: 240000 },
  { month: "May", loans: 50, revenue: 210000 },
  { month: "Jun", loans: 74, revenue: 320000 },
  { month: "Jul", loans: 85, revenue: 390000 },
];

export default function LoanChart({ data = defaultData }) {
  return (
    <Paper sx={{ p: 3.5, borderRadius: 5, height: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
        <Box>
          <Typography variant="h6" fontWeight={800} color="text.primary">
            Monthly Loan & Revenue Growth
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Real-time disbursement volume vs projected interest income
          </Typography>
        </Box>
        <Chip
          label="2026 YTD"
          size="small"
          sx={{
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.1) 100%)",
            color: "#6366F1",
            fontWeight: 800,
            borderRadius: "8px",
            border: "1px solid rgba(99, 102, 241, 0.3)",
          }}
        />
      </Stack>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorLoans" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.08)" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} style={{ fontSize: "12px", fill: "#9CA3AF" }} />
          <YAxis tickLine={false} axisLine={false} style={{ fontSize: "12px", fill: "#9CA3AF" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(17, 24, 39, 0.95)",
              borderRadius: "14px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 14px 35px rgba(0, 0, 0, 0.5)",
              color: "#FFF",
              backdropFilter: "blur(12px)",
            }}
          />
          <Area type="monotone" dataKey="loans" name="Applications" stroke="#6366F1" strokeWidth={3.5} fillOpacity={1} fill="url(#colorLoans)" />
          <Area type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#10B981" strokeWidth={3.5} fillOpacity={1} fill="url(#colorRevenue)" />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
}