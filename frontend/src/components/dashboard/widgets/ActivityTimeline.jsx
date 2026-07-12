import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaymentsIcon from "@mui/icons-material/Payments";

const activities = [
  {
    icon: <CheckCircleIcon />,
    color: "#22c55e",
    title: "Loan Approved",
    subtitle: "Rahul Sharma • 10 min ago",
  },
  {
    icon: <PersonAddIcon />,
    color: "#3b82f6",
    title: "New Customer Added",
    subtitle: "Priya Patel • 30 min ago",
  },
  {
    icon: <PaymentsIcon />,
    color: "#f59e0b",
    title: "EMI Received",
    subtitle: "₹15,000 • 1 hour ago",
  },
];

function ActivityTimeline() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #e5e7eb",
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={2}>
        Recent Activity
      </Typography>

      <List>
        {activities.map((item, index) => (
          <ListItem key={index} disableGutters>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: item.color }}>
                {item.icon}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={item.title}
              secondary={item.subtitle}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default ActivityTimeline;