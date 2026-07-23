import { Box, Card, CardContent, Typography, LinearProgress, Stack, Chip } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export default function StatCard({
  title,
  value,
  change,
  isPositive = true,
  icon,
  color = "#6366F1",
  subtitle,
  progress,
  onClick,
}) {
  return (
    <Card
      onClick={onClick}
      className="glow-card"
      sx={{
        cursor: onClick ? "pointer" : "default",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(15, 23, 42, 0.85) 100%)"
            : "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "90px",
          height: "90px",
          background: `radial-gradient(circle at top right, ${color}25 0%, transparent 70%)`,
          pointerEvents: "none",
        },
      }}
    >
      <CardContent sx={{ p: 2.75, "&:last-child": { pb: 2.75 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1.5}>
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={700} textTransform="uppercase" letterSpacing={0.8}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mt: 0.75, mb: 0.5, color: "text.primary" }}>
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${color}25 0%, ${color}10 100%)`,
              border: `1px solid ${color}35`,
              color: color,
              fontSize: "1.6rem",
              boxShadow: `0 8px 18px -4px ${color}30`,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
          {change && (
            <Chip
              size="small"
              icon={isPositive ? <TrendingUpIcon sx={{ fontSize: "14px !important" }} /> : <TrendingDownIcon sx={{ fontSize: "14px !important" }} />}
              label={change}
              color={isPositive ? "success" : "error"}
              sx={{
                height: 24,
                fontSize: "0.75rem",
                fontWeight: 800,
                borderRadius: "8px",
                px: 0.5,
              }}
            />
          )}
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            {subtitle || (change ? "vs last month" : "")}
          </Typography>
        </Stack>

        {progress !== undefined && (
          <Box sx={{ mt: 2.5 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>Completion</Typography>
              <Typography variant="caption" fontWeight={800} color={color}>{progress}%</Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 7,
                borderRadius: 4,
                backgroundColor: (theme) => (theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.08)" : `${color}15`),
                "& .MuiLinearProgress-bar": {
                  background: `linear-gradient(90deg, ${color} 0%, ${color}CC 100%)`,
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
