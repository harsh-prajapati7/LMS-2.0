import { Box, Typography, Chip, Stack } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SpeedIcon from "@mui/icons-material/Speed";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useAuth } from "../../context/AuthContext";

function DashboardHeader() {
  const { user } = useAuth();
  const now = new Date();

  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2.5,
      }}
    >
      <Box>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
          <Typography variant="h4" fontWeight={800} color="text.primary" letterSpacing="-0.02em">
            Welcome back, <span className="text-gradient">{user?.fullName || "Admin Executive"}</span> 👋
          </Typography>
        </Stack>

        <Typography variant="body1" color="text.secondary" fontWeight={500}>
          Real-time banking metrics, loan portfolio intelligence, and underwriting performance
        </Typography>
      </Box>

      <Stack direction="row" spacing={1.5} flexWrap="wrap">
        <Chip
          icon={<VerifiedUserIcon sx={{ color: "#10B981 !important" }} />}
          label="SLA Compliance 99.4%"
          sx={{
            bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.08)"),
            color: "#10B981",
            fontWeight: 800,
            borderRadius: "12px",
            py: 2.2,
            px: 0.5,
            border: "1px solid rgba(16, 185, 129, 0.3)",
          }}
        />

        <Chip
          icon={<CalendarMonthIcon sx={{ color: "#6366F1 !important" }} />}
          label={now.toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          sx={{
            bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.08)"),
            color: "#6366F1",
            fontWeight: 800,
            borderRadius: "12px",
            py: 2.2,
            px: 0.5,
            border: "1px solid rgba(99, 102, 241, 0.3)",
          }}
        />
      </Stack>
    </Box>
  );
}

export default DashboardHeader;