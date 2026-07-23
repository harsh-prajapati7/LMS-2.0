import { Grid, Paper, Typography, Divider } from "@mui/material";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const COLORS = [
  "#4caf50",
  "#ff9800",
  "#f44336",
  "#2196f3",
];

function LoanAnalytics({ loans = [] }) {
  const statusCount = {};

  loans.forEach((loan) => {
    statusCount[loan.status] =
      (statusCount[loan.status] || 0) + 1;
  });

  const statusData = Object.keys(statusCount).map(
    (key) => ({
      name: key,
      value: statusCount[key],
    })
  );

  const monthly = {};

  loans.forEach((loan) => {
    const month = new Date(
      loan.createdAt
    ).toLocaleString("default", {
      month: "short",
    });

    monthly[month] =
      (monthly[month] || 0) +
      Number(loan.loanAmount);
  });

  const monthlyData = Object.keys(monthly).map(
    (month) => ({
      month,
      amount: monthly[month],
    })
  );

  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid item={{ xs: 12, md: 5 }}>
        <Paper sx={{ p: 3, height: 400 }}>
          <Typography variant="h6">
            Loan Status
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <ResponsiveContainer
            width="100%"
            height="90%"
          >
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item={{ xs: 12, md: 7 }}>
        <Paper sx={{ p: 3, height: 400 }}>
          <Typography variant="h6">
            Loan Amount Trend
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <ResponsiveContainer
            width="100%"
            height="90%"
          >
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="amount"
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoanAnalytics;