import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";

import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export default function Notifications() {
  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState([
    {
      id: 1,
      title: "New High-Value Loan Application",
      desc: "Borrower Vikram Singh submitted an application for ₹12.00L Home Loan.",
      time: "10 mins ago",
      type: "warning",
      unread: true,
    },
    {
      id: 2,
      title: "Loan #L-9842 Approved by Underwriter",
      desc: "Sanction letter has been automatically generated and emailed to applicant.",
      time: "1 hour ago",
      type: "success",
      unread: true,
    },
    {
      id: 3,
      title: "KYC Verification Cleared",
      desc: "Aadhaar and PAN documents for Priya Sharma passed 256-bit automated verification.",
      time: "3 hours ago",
      type: "info",
      unread: false,
    },
    {
      id: 4,
      title: "Quarterly Audit Completed",
      desc: "System security scan completed with zero vulnerabilities found.",
      time: "Yesterday at 04:15 PM",
      type: "info",
      unread: false,
    },
  ]);

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredItems = items.filter((item) => {
    if (filter === "unread") return item.unread;
    return true;
  });

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <PageHeader
          title="Bank-U Centralized Notification Center"
          subtitle="Real-time system updates, risk alerts, loan approvals, and compliance notices"
          breadcrumbs={[{ label: "Notifications", path: "/admin/notifications" }]}
          action={
            <Button
              variant="outlined"
              startIcon={<DoneAllIcon />}
              onClick={markAllRead}
            >
              Mark All as Read
            </Button>
          }
        />

        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1}>
              <Chip
                label={`All (${items.length})`}
                clickable
                color={filter === "all" ? "primary" : "default"}
                onClick={() => setFilter("all")}
              />
              <Chip
                label={`Unread (${items.filter((i) => i.unread).length})`}
                clickable
                color={filter === "unread" ? "primary" : "default"}
                onClick={() => setFilter("unread")}
              />
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Auto-refreshed every 60s
            </Typography>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <List disablePadding>
            {filteredItems.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  p: 2,
                  mb: 1.5,
                  borderRadius: 3,
                  bgcolor: item.unread
                    ? (theme) => (theme.palette.mode === "dark" ? "rgba(21, 101, 192, 0.15)" : "rgba(21, 101, 192, 0.04)")
                    : "transparent",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <ListItemAvatar sx={{ minWidth: 48 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: item.type === "warning" ? "warning.light" : item.type === "success" ? "success.light" : "primary.light",
                      color: item.type === "warning" ? "warning.main" : item.type === "success" ? "success.main" : "primary.main",
                    }}
                  >
                    {item.type === "warning" ? <WarningAmberIcon /> : item.type === "success" ? <CheckCircleIcon /> : <InfoIcon />}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {item.title}
                      </Typography>
                      {item.unread && (
                        <Chip label="NEW" color="error" size="small" sx={{ height: 18, fontSize: "0.65rem", fontWeight: 800 }} />
                      )}
                    </Stack>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {item.desc}
                      </Typography>
                      <Typography variant="caption" color="primary.main" fontWeight={500} sx={{ mt: 0.5, display: "block" }}>
                        {item.time}
                      </Typography>
                    </>
                  }
                />

                <Tooltip title="Dismiss Notification">
                  <IconButton size="small" onClick={() => deleteItem(item.id)}>
                    <DeleteOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </DashboardLayout>
  );
}
