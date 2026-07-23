import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Chip,
  Alert,
  MenuItem,
  Divider,
} from "@mui/material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShieldIcon from "@mui/icons-material/Shield";
import SpeedIcon from "@mui/icons-material/Speed";

import { registerUser } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setErrorMsg("");
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await registerUser(form);
      if (response.data.success) {
        setSuccessMsg("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Registration failed. Please check details.");
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
      {/* Left Screen: Banking Branding & Features */}
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
        }}
      >
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

        <Box sx={{ my: { xs: 6, md: "auto" }, maxWidth: 540, zIndex: 2 }}>
          <Chip
            icon={<SecurityIcon sx={{ color: "#00C853 !important" }} />}
            label="Instant Account Opening & Verification"
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
            Join India's Smartest Digital Loan & Banking SaaS
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.7, mb: 4 }}>
            Create your account to apply for personal, home, or business loans with real-time approval tracking and automated EMI management.
          </Typography>

          <Stack spacing={2}>
            {[
              { title: "Fast-Track Loan Application", desc: "Instant pre-approval eligibility assessment" },
              { title: "Transparent EMI Calculator", desc: "No hidden charges or unexpected fee structure" },
              { title: "Encrypted Portal Access", desc: "Role-based access control with bank-grade security" },
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
        </Stack>
      </Box>

      {/* Right Screen: Glassmorphism Register Form */}
      <Box
        sx={{
          flex: { xs: "none", md: "1" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, sm: 6 },
          background: "#0B0F17",
        }}
      >
        <Paper
          elevation={0}
          className="glass-card animate-fade-in"
          sx={{
            width: "100%",
            maxWidth: 500,
            p: { xs: 3.5, sm: 5 },
            borderRadius: "40px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" fontWeight={800} color="text.primary" sx={{ letterSpacing: "-0.02em" }}>
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
              Register your credentials to access Bank-U portal.
            </Typography>
          </Box>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
              {errorMsg}
            </Alert>
          )}

          {successMsg && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
              {successMsg}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
                FULL NAME
              </Typography>
              <TextField
                fullWidth
                name="fullName"
                placeholder="e.g. Harsh Prajapati"
                value={form.fullName}
                onChange={handleChange}
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
                EMAIL ADDRESS
              </Typography>
              <TextField
                fullWidth
                name="email"
                type="email"
                placeholder="harshhere927@gmail.com"
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
              <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
                PHONE NUMBER
              </Typography>
              <TextField
                fullWidth
                name="phone"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={handleChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlinedIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
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

            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
                ACCOUNT TYPE / ROLE
              </Typography>
              <TextField
                select
                fullWidth
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <MenuItem value="customer">Customer / Borrower</MenuItem>
                <MenuItem value="employee">Bank Officer / Underwriter</MenuItem>
                <MenuItem value="admin">Executive Administrator</MenuItem>
              </TextField>
            </Box>

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
              {loading ? "Registering..." : "Create Account"}
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Already have a Bank-U account?{" "}
            <Typography
              component={Link}
              to="/login"
              color="primary.main"
              fontWeight={700}
              sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              Sign In
            </Typography>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
