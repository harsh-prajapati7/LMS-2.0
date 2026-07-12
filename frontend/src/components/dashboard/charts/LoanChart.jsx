import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Paper, Typography } from "@mui/material";

const data = [
  { month: "Jan", loans: 25 },
  { month: "Feb", loans: 40 },
  { month: "Mar", loans: 38 },
  { month: "Apr", loans: 55 },
  { month: "May", loans: 48 },
  { month: "Jun", loans: 72 },
];

function LoanChart() {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        Loan Analytics
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="loans"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default LoanChart;