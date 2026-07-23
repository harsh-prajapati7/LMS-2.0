import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  InputAdornment,
  IconButton,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SecurityIcon from "@mui/icons-material/Security";
import LockResetIcon from "@mui/icons-material/LockReset";
import SpeedIcon from "@mui/icons-material/Speed";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShieldIcon from "@mui/icons-material/Shield";

import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleChange = (e) => {
    setErrorMsg("");
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePresetFill = (email, password) => {
    setForm({ email, password });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const user = await login(form);

      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "employee":
          navigate("/employee/dashboard");
          break;
        case "customer":
          navigate("/customer/dashboard");
          break;
        default:
          navigate("/admin/dashboard");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Invalid credentials. Please verify email & password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "#0B0F17",
      }}
    >
      {/* Left Screen: Banking Branding & Trust Indicators */}
      <Box
        sx={{
          flex: { xs: "none", md: "1" },
          minHeight: { xs: "auto", md: "100vh" },
          p: { xs: 4, md: 8 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1565C0 0%, #0D47A1 50%, #0A192F 100%)",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-20%",
            right: "-20%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(66,165,245,0.25) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
          },
        }}
      >
        {/* Brand Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ zIndex: 2 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "16px",
              bgcolor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <AccountBalanceIcon sx={{ fontSize: 32, color: "#FFFFFF" }} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.02em">
              Bank-U
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 500 }}>
              Enterprise Digital Banking Platform
            </Typography>
          </Box>
        </Stack>

        {/* Hero Copy & Platform Highlights */}
        <Box sx={{ my: { xs: 6, md: "auto" }, maxWidth: 540, zIndex: 2 }}>
          <Chip
            icon={<SecurityIcon sx={{ color: "#00C853 !important" }} />}
            label="256-Bit SSL Encrypted Banking Portal"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.12)",
              color: "#FFFFFF",
              fontWeight: 600,
              mb: 3,
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          />

          <Typography variant="h3" fontWeight={800} leading={1.15} sx={{ mb: 2 }}>
            Next-Generation Loan Management & Core Banking SaaS
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.7, mb: 4 }}>
            Empowering modern financial institutions with real-time credit scoring, automated EMI calculations, seamless approval workflows, and multi-tier role management.
          </Typography>

          {/* Key Features */}
          <Stack spacing={2}>
            {[
              { title: "Real-Time Loan Processing", desc: "Instant eligibility check & automated risk evaluation algorithm" },
              { title: "Enterprise Compliance & KYC", desc: "RBI regulation compliant document verification workflow" },
              { title: "Role-Based Multi-Portal", desc: "Dedicated dashboards for Admin Executives, Loan Officers & Borrowers" },
            ].map((feat, i) => (
              <Stack key={i} direction="row" spacing={2} alignItems="flex-start">
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    bgcolor: "rgba(0, 200, 83, 0.2)",
                    color: "#00C853",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 0.2,
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 18 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {feat.title}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {feat.desc}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Trust Badges */}
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          sx={{
            zIndex: 2,
            pt: 3,
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <ShieldIcon sx={{ fontSize: 18, color: "#42A5F5" }} />
            <Typography variant="caption" fontWeight={600}>ISO 27001 Certified</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <VerifiedUserIcon sx={{ fontSize: 18, color: "#00C853" }} />
            <Typography variant="caption" fontWeight={600}>PCI-DSS Level 1</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <SpeedIcon sx={{ fontSize: 18, color: "#FFD700" }} />
            <Typography variant="caption" fontWeight={600}>99.99% Uptime Guarantee</Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Right Screen: Glassmorphism Login Form */}
      <Box
        sx={{
          flex: { xs: "none", md: "1" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, sm: 6 },
          background: "#0B0F17",
          position: "relative",
        }}
      >
        <Paper
          elevation={0}
          className="glass-card animate-fade-in"
          sx={{
            width: "100%",
            maxWidth: 480,
            p: { xs: 3.5, sm: 5 },
            borderRadius: "40px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" fontWeight={800} color="text.primary" sx={{ letterSpacing: "-0.02em" }}>
              Sign In to Bank-U
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
              Access your secure banking workspace & portal.
            </Typography>
          </Box>

          {/* Alert Error */}
          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
              {errorMsg}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 0.75, display: "block" }}>
                EMAIL ADDRESS
              </Typography>
              <TextField
                fullWidth
                name="email"
                placeholder="name@bank-u.com"
                value={form.email}
                onChange={handleChange}
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 0.75, display: "block" }}>
                PASSWORD
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••••••"
                value={form.password}
                onChange={handleChange}
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            {/* Remember Me & Forgot Password */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <FormControlLabel
                control={<Checkbox defaultChecked size="small" color="primary" />}
                label={<Typography variant="body2" color="text.secondary">Remember me</Typography>}
              />
              <Typography
                variant="body2"
                color="primary.main"
                fontWeight={600}
                sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                onClick={() => setForgotOpen(true)}
              >
                Forgot Password?
              </Typography>
            </Stack>

            {/* Submit Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              startIcon={<VerifiedUserIcon />}
              sx={{
                py: 1.6,
                fontSize: "1rem",
                fontWeight: 700,
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(21, 101, 192, 0.4)",
              }}
            >
              {loading ? "Authenticating..." : "Secure Sign In"}
            </Button>
          </form>

          {/* Quick fill presets helper */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              DEMO QUICK LOGINS
            </Typography>
          </Divider>

          <Stack direction="row" spacing={1} justifyContent="center">
            <Chip
              label="Admin Demo"
              onClick={() => handlePresetFill("admin@bank-u.com", "admin123")}
              clickable
              color="primary"
              variant="outlined"
              size="small"
            />
            <Chip
              label="Employee Demo"
              onClick={() => handlePresetFill("officer@bank-u.com", "emp123")}
              clickable
              color="secondary"
              variant="outlined"
              size="small"
            />
            <Chip
              label="Customer Demo"
              onClick={() => handlePresetFill("customer@bank-u.com", "cust123")}
              clickable
              color="success"
              variant="outlined"
              size="small"
            />
          </Stack>

          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 3 }}>
            Don't have an account?{" "}
            <Typography
              component={Link}
              to="/register"
              color="primary.main"
              fontWeight={700}
              sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              Register New Account
            </Typography>
          </Typography>
        </Paper>
      </Box>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotOpen} onClose={() => setForgotOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <LockResetIcon color="primary" /> Reset Password
        </DialogTitle>
        <DialogContent>
          {forgotSent ? (
            <Alert severity="success" sx={{ my: 1 }}>
              Password reset link has been dispatched to {forgotEmail}.
            </Alert>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enter your registered enterprise email address to receive password reset instructions.
              </Typography>
              <TextField
                fullWidth
                label="Email Address"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="name@bank-u.com"
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setForgotOpen(false)} color="inherit">Close</Button>
          {!forgotSent && (
            <Button variant="contained" onClick={() => setForgotSent(true)} disabled={!forgotEmail}>
              Send Reset Link
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}