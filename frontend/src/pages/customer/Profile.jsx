import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Stack,
  Chip,
  Alert,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockResetIcon from "@mui/icons-material/LockReset";
import SaveIcon from "@mui/icons-material/Save";

import { useAuth } from "../../context/AuthContext";

export default function CustomerProfile() {
  const { user } = useAuth();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || "Harsh Prajapati",
    email: user?.email || "customer@bank-u.com",
    phone: user?.phone || "+91 98765 43210",
    address: "123 Banking Street, Financial District, Mumbai",
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <PageHeader
          title="Customer Profile & Security"
          subtitle="Manage your personal information, address, and login credentials"
          breadcrumbs={[{ label: "My Profile", path: "/customer/profile" }]}
        />

        {savedSuccess && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
            Profile details updated successfully!
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: "center", borderRadius: 4 }}>
              <Avatar
                sx={{
                  width: 96,
                  height: 96,
                  margin: "0 auto",
                  bgcolor: "primary.main",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                {form.fullName ? form.fullName[0].toUpperCase() : "U"}
              </Avatar>
              <Typography variant="h6" fontWeight={700}>
                {form.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {form.email}
              </Typography>

              <Chip
                icon={<VerifiedUserIcon sx={{ color: "#00C853 !important" }} />}
                label="KYC VERIFIED BORROWER"
                color="success"
                variant="outlined"
                sx={{ fontWeight: 700 }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                Personal Information
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Keep your contact information up to date for official banking notifications
              </Typography>

              <form onSubmit={handleSave}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Legal Name"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      value={form.email}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Contact Phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Permanent Address"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                  </Grid>
                </Grid>

                <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                  <Button variant="contained" type="submit" startIcon={<SaveIcon />}>
                    Save Changes
                  </Button>
                  <Button variant="outlined" startIcon={<LockResetIcon />}>
                    Change Password
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}