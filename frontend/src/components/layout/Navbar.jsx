import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Stack,
  IconButton,
  Badge,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Chip,
  Tooltip,
  Paper,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Container,
  Drawer,
} from "@mui/material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PeopleIcon from "@mui/icons-material/People";
import BadgeIcon from "@mui/icons-material/Badge";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import SearchBar from "../ui/SearchBar";
import { useAuth } from "../../context/AuthContext";
import { useThemeMode } from "../../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [msgAnchor, setMsgAnchor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const userRole = user?.role || "admin";

  const getNavItems = () => {
    if (userRole === "customer") {
      return [
        { name: "Dashboard", path: "/customer/dashboard", icon: <DashboardIcon fontSize="small" /> },
        { name: "My Loans", path: "/admin/loans", icon: <AccountBalanceWalletIcon fontSize="small" /> },
        { name: "My Profile", path: "/customer/profile", icon: <PersonOutlinedIcon fontSize="small" /> },
        { name: "Notifications", path: "/admin/notifications", icon: <NotificationsOutlinedIcon fontSize="small" />, badge: "2" },
        { name: "Settings", path: "/admin/settings", icon: <SettingsIcon fontSize="small" /> },
      ];
    }
    if (userRole === "employee") {
      return [
        { name: "Dashboard", path: "/employee/dashboard", icon: <DashboardIcon fontSize="small" /> },
        { name: "Assigned Loans", path: "/admin/loans", icon: <AccountBalanceWalletIcon fontSize="small" />, badge: "4" },
        { name: "Customers", path: "/admin/customers", icon: <PeopleIcon fontSize="small" /> },
        { name: "Reports", path: "/admin/reports", icon: <AssessmentIcon fontSize="small" /> },
        { name: "Notifications", path: "/admin/notifications", icon: <NotificationsOutlinedIcon fontSize="small" />, badge: "3" },
        { name: "Settings", path: "/admin/settings", icon: <SettingsIcon fontSize="small" /> },
      ];
    }
    return [
      { name: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon fontSize="small" /> },
      { name: "Loans Queue", path: "/admin/loans", icon: <AccountBalanceWalletIcon fontSize="small" />, badge: "12" },
      { name: "Customers", path: "/admin/customers", icon: <PeopleIcon fontSize="small" /> },
      { name: "Employees", path: "/admin/employees", icon: <BadgeIcon fontSize="small" /> },
      { name: "Reports", path: "/admin/reports", icon: <AssessmentIcon fontSize="small" /> },
      { name: "Analytics", path: "/admin/analytics", icon: <AnalyticsIcon fontSize="small" /> },
      { name: "Notifications", path: "/admin/notifications", icon: <NotificationsOutlinedIcon fontSize="small" />, badge: "5" },
      { name: "Settings", path: "/admin/settings", icon: <SettingsIcon fontSize="small" /> },
    ];
  };

  const navItems = getNavItems();

  const notifications = [
    { id: 1, title: "New Loan Application", desc: "Rajesh Kumar applied for ₹5.00L Personal Loan", time: "5m ago" },
    { id: 2, title: "Loan Approved", desc: "Loan #L-9842 was approved by Admin", time: "1h ago" },
    { id: 3, title: "KYC Verification", desc: "Priya Sharma uploaded new KYC documents", time: "3h ago" },
  ];

  const messages = [
    { id: 1, sender: "Senior Loan Officer", text: "Please review the collateral verification report.", time: "10m ago" },
    { id: 2, sender: "Risk Compliance Team", text: "Q3 Audit checklist has been updated.", time: "2h ago" },
  ];

  const handleLogout = () => {
    setAnchorEl(null);
    setMobileOpen(false);
    logout();
    navigate("/login");
  };

  const iconBtnStyle = {
    width: 38,
    height: 38,
    minWidth: 38,
    borderRadius: "50%",
    flexShrink: 0,
    border: "1px solid",
    borderColor: "divider",
    p: 0,
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "rgba(11, 15, 23, 0.94)" : "rgba(255, 255, 255, 0.94)",
        backdropFilter: "blur(24px)",
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 1.5, sm: 3, md: 4 } }}>
        {/* Top Header Bar */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 1.25, borderBottom: "1px solid", borderColor: "divider" }}
          spacing={{ xs: 1, sm: 2 }}
        >
          {/* Brand Logo & Portal Badge */}
          <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }} sx={{ minWidth: 0 }}>
            {/* Mobile Hamburger Drawer Trigger */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                ...iconBtnStyle,
                display: { xs: "inline-flex", md: "none" },
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>

            <Link to={navItems[0].path} style={{ textDecoration: "none" }}>
              <Stack direction="row" alignItems="center" spacing={1.2}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #6366F1 0%, #10B981 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    boxShadow: "0 6px 16px -3px rgba(99, 102, 241, 0.4)",
                    flexShrink: 0,
                  }}
                >
                  <AccountBalanceIcon sx={{ fontSize: "1.35rem" }} />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Stack direction="row" alignItems="center" spacing={0.75}>
                    <Typography
                      variant="h6"
                      fontWeight={800}
                      letterSpacing="-0.02em"
                      color="text.primary"
                      sx={{ whiteSpace: "nowrap", fontSize: { xs: "1.05rem", sm: "1.25rem" } }}
                    >
                      Bank-U
                    </Typography>
                    <Chip
                      label="PRO"
                      size="small"
                      sx={{
                        height: 16,
                        fontSize: "0.6rem",
                        fontWeight: 900,
                        background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
                        color: "#FFFFFF",
                        borderRadius: "5px",
                        px: 0.25,
                      }}
                    />
                  </Stack>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ display: { xs: "none", sm: "block" }, whiteSpace: "nowrap" }}
                  >
                    Digital Banking Platform
                  </Typography>
                </Box>
              </Stack>
            </Link>

            <Chip
              label={`${userRole.toUpperCase()} PORTAL`}
              size="small"
              sx={{
                display: { xs: "none", lg: "inline-flex" },
                bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.08)"),
                color: "#6366F1",
                fontWeight: 800,
                borderRadius: "8px",
                border: "1px solid rgba(99, 102, 241, 0.3)",
              }}
            />
          </Stack>

          {/* Center Search Input */}
          <Box sx={{ flexGrow: 1, maxWidth: 460, display: { xs: "none", md: "block" } }}>
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Search loans, customers, transaction IDs..."
              size="small"
            />
          </Box>

          {/* Right Controls */}
          <Stack direction="row" alignItems="center" spacing={{ xs: 0.75, sm: 1.25 }}>
            {/* System Status Dot */}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ display: { xs: "none", lg: "flex" }, mr: 1 }}>
              <Box className="neon-dot" />
              <Typography variant="caption" color="success.main" fontWeight={700}>
                Systems Operational
              </Typography>
            </Stack>

            {/* Dark Mode */}
            <Tooltip title="Toggle Dark/Light Mode">
              <IconButton onClick={toggleTheme} color="inherit" sx={iconBtnStyle}>
                {mode === "dark" ? <LightModeOutlinedIcon sx={{ color: "#FBBF24", fontSize: 20 }} /> : <DarkModeOutlinedIcon sx={{ color: "#475569", fontSize: 20 }} />}
              </IconButton>
            </Tooltip>

            {/* Messages */}
            <Tooltip title="Messages">
              <IconButton
                onClick={(e) => setMsgAnchor(e.currentTarget)}
                color="inherit"
                sx={{ ...iconBtnStyle, display: { xs: "none", sm: "inline-flex" } }}
              >
                <Badge badgeContent={messages.length} color="secondary">
                  <ChatBubbleOutlineOutlinedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)} color="inherit" sx={iconBtnStyle}>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsOutlinedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                </Badge>
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.25, height: 24, alignSelf: "center", display: { xs: "none", sm: "block" } }} />

            {/* User Profile Avatar */}
            <Button
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                p: 0.25,
                minWidth: 0,
                borderRadius: 3,
                textTransform: "none",
                color: "text.primary",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    background: "linear-gradient(135deg, #6366F1 0%, #10B981 100%)",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    flexShrink: 0,
                  }}
                >
                  {user?.fullName ? user.fullName[0].toUpperCase() : "A"}
                </Avatar>

                <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "left" }}>
                  <Typography variant="subtitle2" fontWeight={800} leading={1.2}>
                    {user?.fullName || "Admin Executive"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {user?.email || "admin@bank-u.com"}
                  </Typography>
                </Box>
              </Stack>
            </Button>
          </Stack>
        </Stack>

        {/* Bottom Horizontal Navigation Tabs Bar */}
        <Box
          sx={{
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            py: 0.5,
          }}
        >
          <Stack direction="row" spacing={0.75} sx={{ minWidth: "max-content", py: 0.5 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    flexShrink: 0,
                    borderRadius: "10px",
                    px: 1.75,
                    py: 0.75,
                    fontSize: "0.825rem",
                    fontWeight: isActive ? 800 : 600,
                    whiteSpace: "nowrap",
                    color: isActive ? "#6366F1" : "text.secondary",
                    background: isActive
                      ? (theme) => (theme.palette.mode === "dark" ? "rgba(99, 102, 241, 0.18)" : "rgba(99, 102, 241, 0.08)")
                      : "transparent",
                    borderBottom: isActive ? "2px solid #6366F1" : "2px solid transparent",
                    "&:hover": {
                      background: (theme) => (theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(99, 102, 241, 0.04)"),
                      color: "#6366F1",
                    },
                    "& .MuiButton-startIcon": {
                      mr: 0.75,
                    },
                  }}
                >
                  {item.name}
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        ml: 0.75,
                        height: 16,
                        fontSize: "0.65rem",
                        fontWeight: 900,
                        bgcolor: isActive ? "#6366F1" : "action.selected",
                        color: isActive ? "#FFFFFF" : "text.primary",
                      }}
                    />
                  )}
                </Button>
              );
            })}
          </Stack>
        </Box>

        {/* Mobile Navigation Drawer */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{
            sx: {
              width: 290,
              p: 2.5,
              bgcolor: (theme) => (theme.palette.mode === "dark" ? "#0F172A" : "#FFFFFF"),
            },
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #6366F1 0%, #10B981 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                }}
              >
                <AccountBalanceIcon sx={{ fontSize: "1.2rem" }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={800} color="text.primary">
                  Bank-U
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {userRole.toUpperCase()} PORTAL
                </Typography>
              </Box>
            </Stack>

            <IconButton onClick={() => setMobileOpen(false)} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Box sx={{ mb: 2.5 }}>
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Search..."
              size="small"
            />
          </Box>

          <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ mb: 1, display: "block" }}>
            NAVIGATION
          </Typography>

          <List disablePadding sx={{ mb: 3 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem
                  key={item.name}
                  component={Link}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    borderRadius: "10px",
                    mb: 0.5,
                    color: isActive ? "#6366F1" : "text.primary",
                    bgcolor: isActive
                      ? (theme) => (theme.palette.mode === "dark" ? "rgba(99, 102, 241, 0.18)" : "rgba(99, 102, 241, 0.08)")
                      : "transparent",
                    fontWeight: isActive ? 800 : 500,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: isActive ? "#6366F1" : "text.secondary" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: isActive ? 800 : 600 }} />
                  {item.badge && (
                    <Chip label={item.badge} size="small" color="primary" sx={{ height: 18, fontSize: "0.65rem", fontWeight: 800 }} />
                  )}
                </ListItem>
              );
            })}
          </List>

          <Divider sx={{ mb: 2 }} />

          {/* User profile section inside drawer */}
          <Box sx={{ mt: "auto" }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background: "linear-gradient(135deg, #6366F1 0%, #10B981 100%)",
                  fontWeight: 800,
                }}
              >
                {user?.fullName ? user.fullName[0].toUpperCase() : "A"}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle2" fontWeight={800} noWrap>
                  {user?.fullName || "User Account"}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap display="block">
                  {user?.email || "user@bank-u.com"}
                </Typography>
              </Box>
            </Stack>

            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon fontSize="small" />}
              onClick={handleLogout}
              sx={{ borderRadius: "10px" }}
            >
              Sign Out
            </Button>
          </Box>
        </Drawer>

        {/* User Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            sx: {
              width: 260,
              mt: 1.5,
              p: 1.5,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 14px 35px rgba(0,0,0,0.3)",
            },
          }}
        >
          <Box sx={{ px: 1.5, py: 1 }}>
            <Typography variant="subtitle1" fontWeight={800}>
              {user?.fullName || "Admin Executive"}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {user?.email || "admin@bank-u.com"}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={() => { setAnchorEl(null); navigate("/customer/profile"); }} sx={{ borderRadius: 2 }}>
            <ListItemIcon><PersonOutlinedIcon fontSize="small" /></ListItemIcon>
            My Profile
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)} sx={{ borderRadius: 2 }}>
            <ListItemIcon><SecurityOutlinedIcon fontSize="small" /></ListItemIcon>
            Security & Audit
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={handleLogout} sx={{ color: "error.main", borderRadius: 2 }}>
            <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
            Sign Out
          </MenuItem>
        </Menu>

        {/* Notifications Popover */}
        <Popover
          open={Boolean(notifAnchor)}
          anchorEl={notifAnchor}
          onClose={() => setNotifAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              width: { xs: 300, sm: 380 },
              p: 2.5,
              borderRadius: 4,
              mt: 1.5,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 14px 35px rgba(0,0,0,0.3)",
            },
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
            <Typography variant="subtitle1" fontWeight={800}>Notifications</Typography>
            <Chip label="3 New" size="small" color="primary" sx={{ height: 22, fontSize: "0.725rem", fontWeight: 800 }} />
          </Stack>
          <Divider sx={{ mb: 1.5 }} />
          <List disablePadding>
            {notifications.map((item) => (
              <ListItem key={item.id} disableGutters sx={{ py: 1.2, borderBottom: "1px solid", borderColor: "divider", "&:last-child": { borderBottom: "none" } }}>
                <ListItemAvatar sx={{ minWidth: 44 }}>
                  <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.light", color: "primary.main" }}>
                    <CheckCircleOutlinedIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="subtitle2" fontWeight={800}>{item.title}</Typography>}
                  secondary={
                    <Box sx={{ mt: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem", lineHeight: 1.4 }}>
                        {item.desc}
                      </Typography>
                      <Typography variant="caption" color="primary.main" fontWeight={700} sx={{ mt: 0.5, display: "inline-block" }}>
                        {item.time}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Popover>

        {/* Messages Popover */}
        <Popover
          open={Boolean(msgAnchor)}
          anchorEl={msgAnchor}
          onClose={() => setMsgAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              width: { xs: 290, sm: 360 },
              p: 2.5,
              borderRadius: 4,
              mt: 1.5,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 14px 35px rgba(0,0,0,0.3)",
            },
          }}
        >
          <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1.5 }}>Direct Messages</Typography>
          <Divider sx={{ mb: 1.5 }} />
          <List disablePadding>
            {messages.map((item) => (
              <ListItem key={item.id} disableGutters sx={{ py: 1.2, borderBottom: "1px solid", borderColor: "divider", "&:last-child": { borderBottom: "none" } }}>
                <ListItemText
                  primary={<Typography variant="subtitle2" fontWeight={800}>{item.sender}</Typography>}
                  secondary={
                    <Box sx={{ mt: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem", lineHeight: 1.4 }}>
                        {item.text}
                      </Typography>
                      <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: "inline-block" }}>
                        {item.time}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Popover>
      </Container>
    </Paper>
  );
}