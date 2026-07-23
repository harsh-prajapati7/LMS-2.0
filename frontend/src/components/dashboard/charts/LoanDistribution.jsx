import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Paper, Typography, Box } from "@mui/material";

const defaultData = [
  { name: "Approved", value: 45, color: "#10B981" },
  { name: "Pending", value: 30, color: "#F59E0B" },
  { name: "Rejected", value: 15, color: "#F43F5E" },
  { name: "Assigned", value: 10, color: "#6366F1" },
];

export default function LoanDistribution({ data = defaultData }) {
  return (
    <Paper sx={{ p: 3.5, borderRadius: 5, height: "100%" }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={800} color="text.primary">
          Loan Portfolio Breakdown
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight={500}>
          Real-time application status distribution
        </Typography>
      </Box>

      <ResponsiveContainer width="100%" height={290}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={6}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
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
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}