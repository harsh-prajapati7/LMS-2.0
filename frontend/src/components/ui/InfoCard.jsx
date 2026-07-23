import { Paper, Typography, Stack, Box, Divider } from "@mui/material";

export default function InfoCard({ title, icon, items = [], action, children }) {
  return (
    <Paper sx={{ p: 2.5, height: "100%", borderRadius: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          {icon && (
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "primary.main",
                color: "#FFFFFF",
                fontSize: 18,
              }}
            >
              {icon}
            </Box>
          )}
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
        </Stack>
        {action && <Box>{action}</Box>}
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {items.length > 0 ? (
        <Stack spacing={1.5}>
          {items.map((item, idx) => (
            <Stack key={idx} direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {item.label}
              </Typography>
              <Typography variant="body2" fontWeight={600} color="text.primary">
                {item.value || "-"}
              </Typography>
            </Stack>
          ))}
        </Stack>
      ) : (
        children
      )}
    </Paper>
  );
}
