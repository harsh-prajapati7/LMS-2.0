import { Chip, Box } from "@mui/material";

export default function StatusChip({ status, size = "medium", sx = {} }) {
  const getStatusConfig = (val) => {
    const formatted = (val || "Pending").toLowerCase();
    switch (formatted) {
      case "approved":
        return { label: "Approved", color: "#00C853", bg: "rgba(0, 200, 83, 0.12)" };
      case "rejected":
        return { label: "Rejected", color: "#EF4444", bg: "rgba(239, 68, 68, 0.12)" };
      case "assigned":
        return { label: "Assigned", color: "#0284C7", bg: "rgba(2, 132, 199, 0.12)" };
      case "active":
        return { label: "Active", color: "#10B981", bg: "rgba(16, 185, 129, 0.12)" };
      case "completed":
        return { label: "Completed", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.12)" };
      case "pending":
      default:
        return { label: "Pending", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.12)" };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      size={size}
      icon={
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: config.color,
            ml: "6px !important",
            boxShadow: `0 0 6px ${config.color}`,
          }}
        />
      }
      label={config.label}
      sx={{
        backgroundColor: config.bg,
        color: config.color,
        fontWeight: 700,
        fontSize: size === "small" ? "0.725rem" : "0.8125rem",
        borderRadius: "8px",
        border: `1px solid ${config.color}30`,
        px: 0.5,
        ...sx,
      }}
    />
  );
}
