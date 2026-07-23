import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Stack,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Paper,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PeopleIcon from "@mui/icons-material/People";
import BadgeIcon from "@mui/icons-material/Badge";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ mobileOpen, handleDrawerToggle, collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userRole = user?.role || "admin";

  const getNavItems = () => {
    if (userRole === "customer") {
      return [
        { name: "Dashboard", path: "/customer/dashboard", icon: <DashboardIcon /> },
        { name: "My Loans", path: "/admin/loans", icon: <AccountBalanceWalletIcon /> },
        { name: "My Profile", path: "/customer/profile", icon: <PersonIcon /> },
        { name: "Notifications", path: "/admin/notifications", icon: <NotificationsIcon />, badge: "2" },
        { name: "Settings", path: "/admin/settings", icon: <SettingsIcon /> },
      ];
    }
    if (userRole === "employee") {
      return [
        { name: "Dashboard", path: "/employee/dashboard", icon: <DashboardIcon /> },
        { name: "Assigned Loans", path: "/admin/loans", icon: <AccountBalanceWalletIcon />, badge: "4" },
        { name: "Customers", path: "/admin/customers", icon: <PeopleIcon /> },
        { name: "Reports", path: "/admin/reports", icon: <AssessmentIcon /> },
        { name: "Notifications", path: "/admin/notifications", icon: <NotificationsIcon />, badge: "3" },
        { name: "Settings", path: "/admin/settings", icon: <SettingsIcon /> },
      ];
    }
    // Default Admin
    return [
      { name: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
      { name: "Loans", path: "/admin/loans", icon: <AccountBalanceWalletIcon />, badge: "12" },
      { name: "Customers", path: "/admin/customers", icon: <PeopleIcon /> },
      { name: "Employees", path: "/admin/employees", icon: <BadgeIcon /> },
      { name: "Reports", path: "/admin/reports", icon: <AssessmentIcon /> },
      { name: "Analytics", path: "/admin/analytics", icon: <AnalyticsIcon /> },
      { name: "Notifications", path: "/admin/notifications", icon: <NotificationsIcon />, badge: "5" },
      { name: "Settings", path: "/admin/settings", icon: <SettingsIcon /> },
    ];
  };

  const menuItems = getNavItems();
  const drawerWidth = collapsed ? 84 : 270;

  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2.5,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#0D1322" : "#FFFFFF",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box>
        {/* Brand Logo Header */}
        <Stack direction="row" alignItems="center" justifyContent={collapsed ? "center" : "space-between"} sx={{ mb: 4, pt: 0.5 }}>
          <Stack direction="row" alignItems="center" spacing={1.75}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "14px",
                background: "linear-gradient(135deg, #6366F1 0%, #10B981 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                boxShadow: "0 8px 20px -4px rgba(99, 102, 241, 0.5)",
              }}
            >
              <AccountBalanceIcon sx={{ fontSize: "1.6rem" }} />
            </Box>

            {!collapsed && (
              <Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h6" fontWeight={800} letterSpacing="-0.02em" color="text.primary">
                    Bank-U
                  </Typography>
                  <Chip
                    label="PRO"
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: "0.65rem",
                      fontWeight: 900,
                      background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
                      color: "#FFFFFF",
                      borderRadius: "6px",
                      px: 0.5,
                    }}
                  />
                </Stack>
                <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                  NextGen SaaS Engine
                </Typography>
              </Box>
            )}
          </Stack>

          {/* Desktop Collapse Toggle */}
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            size="small"
            sx={{
              display: { xs: "none", md: "inline-flex" },
              border: "1px solid",
              borderColor: "divider",
              bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.02)"),
            }}
          >
            {collapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
          </IconButton>
        </Stack>

        <Divider sx={{ mb: 2.5, opacity: 0.6 }} />

        {/* Navigation Menu */}
        <List disablePadding>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
                <Tooltip title={collapsed ? item.name : ""} placement="right">
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    selected={isActive}
                    sx={{
                      borderRadius: "12px",
                      py: 1.3,
                      px: collapsed ? 1.5 : 2,
                      justifyContent: collapsed ? "center" : "flex-start",
                      transition: "all 0.25s ease",
                      color: isActive ? "#6366F1" : "text.secondary",
                      background: isActive
                        ? (theme) => (theme.palette.mode === "dark" ? "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.1) 100%)" : "rgba(99, 102, 241, 0.08)")
                        : "transparent",
                      border: isActive ? "1px solid rgba(99, 102, 241, 0.3)" : "1px solid transparent",
                      "&:hover": {
                        background: (theme) => (theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(99, 102, 241, 0.04)"),
                        color: "#6366F1",
                        transform: "translateX(3px)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: collapsed ? 0 : 38,
                        color: isActive ? "#6366F1" : "text.secondary",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    {!collapsed && (
                      <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{
                          fontSize: "0.9125rem",
                          fontWeight: isActive ? 700 : 600,
                        }}
                      />
                    )}

                    {!collapsed && item.badge && (
                      <Chip
                        label={item.badge}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.7rem",
                          fontWeight: 800,
                          bgcolor: isActive ? "#6366F1" : "action.selected",
                          color: isActive ? "#FFFFFF" : "text.primary",
                          borderRadius: "8px",
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom Profile Footer */}
      <Box>
        <Divider sx={{ my: 2, opacity: 0.6 }} />

        <Paper
          elevation={0}
          sx={{
            p: collapsed ? 1 : 1.75,
            borderRadius: 3,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent={collapsed ? "center" : "space-between"}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  background: "linear-gradient(135deg, #6366F1 0%, #10B981 100%)",
                  fontSize: "0.95rem",
                  fontWeight: 800,
                }}
              >
                {user?.fullName ? user.fullName[0].toUpperCase() : "A"}
              </Avatar>

              {!collapsed && (
                <Box sx={{ overflow: "hidden" }}>
                  <Typography variant="subtitle2" fontWeight={700} noWrap>
                    {user?.fullName || "Admin Executive"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" noWrap>
                    {user?.email || "admin@bank-u.com"}
                  </Typography>
                </Box>
              )}
            </Stack>

            {!collapsed && (
              <Tooltip title="Sign Out">
                <IconButton size="small" onClick={handleLogout} sx={{ color: "error.main" }}>
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 }, transition: "width 0.25s ease" }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 270 },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Desktop Persistent Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "none",
            transition: "width 0.25s ease",
          },
        }}
        open
      >
        {sidebarContent}
      </Drawer>
    </Box>
  );
}