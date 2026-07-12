import {
  Paper,
  Typography,
  Stack,
  Card,
  CardActionArea,
  CardContent,
  Box,
} from "@mui/material";

import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PaymentsIcon from "@mui/icons-material/Payments";
import AssessmentIcon from "@mui/icons-material/Assessment";

const actions = [
  {
    title: "New Loan",
    subtitle: "Create a new loan application",
    icon: <AddCircleOutlinedIcon />,
    color: "#2563eb",
  },
  {
    title: "Add Customer",
    subtitle: "Register a new customer",
    icon: <PersonAddAlt1Icon />,
    color: "#10b981",
  },
  {
    title: "Collect EMI",
    subtitle: "Receive EMI payment",
    icon: <PaymentsIcon />,
    color: "#f59e0b",
  },
  {
    title: "Reports",
    subtitle: "Generate business reports",
    icon: <AssessmentIcon />,
    color: "#ef4444",
  },
];

function QuickActions() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #e5e7eb",
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={3}>
        Quick Actions
      </Typography>

      <Stack spacing={2}>
        {actions.map((action) => (
          <Card
            key={action.title}
            elevation={0}
            sx={{
              border: "1px solid #e5e7eb",
              borderRadius: 3,
              transition: ".3s",

              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 30px rgba(0,0,0,.08)",
              },
            }}
          >
            <CardActionArea>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: `${action.color}15`,
                      color: action.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {action.icon}
                  </Box>

                  <Box>
                    <Typography fontWeight={600}>
                      {action.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {action.subtitle}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Paper>
  );
}

export default QuickActions;