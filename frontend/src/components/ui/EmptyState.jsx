import { Box, Typography, Button, Stack } from "@mui/material";
import FolderOffOutlinedIcon from "@mui/icons-material/FolderOffOutlined";

export default function EmptyState({
  title = "No data available",
  description = "There are no records found for your current criteria.",
  icon = <FolderOffOutlinedIcon sx={{ fontSize: 64, color: "primary.main" }} />,
  actionLabel,
  onAction,
}) {
  return (
    <Box
      sx={{
        py: 8,
        px: 3,
        textAlign: "center",
        borderRadius: 4,
        border: "1px dashed",
        borderColor: "divider",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.02)" : "rgba(245, 247, 250, 0.5)",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Box
          sx={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            backgroundColor: "primary.light",
            opacity: 0.9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Box sx={{ maxWidth: 400 }}>
          <Typography variant="h6" fontWeight={700} color="text.primary">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        </Box>
        {actionLabel && onAction && (
          <Button variant="contained" onClick={onAction} sx={{ mt: 1 }}>
            {actionLabel}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
