import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Box,
} from "@mui/material";

function StatCard({
  title,
  value,
  icon,
  color,
  change,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        p: 1,
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid #e5e7eb",
        transition: "all .3s ease",

        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(37,99,235,.18)",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: color,
              width: 60,
              height: 60,
              boxShadow: `0 8px 20px ${color}55`,
              "& svg": {
                fontSize: 30,
              },
            }}
          >
            {icon}
          </Avatar>
          <Chip
            label={`${change.startsWith("-") ? "▼" : "▲"} ${change}`}
            size="small"
            color={change.startsWith("-") ? "warning" : "success"}
            sx={{
              fontWeight: 600,
            }}
            color={change.startsWith("-") ? "warning" : "success"}
          />
        </Box>

        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            mt: 3,
            color: "#111827",
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#6b7280",
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;