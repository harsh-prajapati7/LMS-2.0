import { Box, Typography, Chip } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function DashboardHeader() {
  const now = new Date();

  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Good Morning, Harsh 👋
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Welcome back to your Loan Management Dashboard.
        </Typography>
      </Box>

      <Chip
        icon={<CalendarMonthIcon />}
        label={now.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        color="primary"
        variant="outlined"
      />
    </Box>
  );
}

export default DashboardHeader;