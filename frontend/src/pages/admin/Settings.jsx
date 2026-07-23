import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Tab,
  Tabs,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";

import SettingsIcon from "@mui/icons-material/Settings";
import SecurityIcon from "@mui/icons-material/Security";
import TuneIcon from "@mui/icons-material/Tune";
import SaveIcon from "@mui/icons-material/Save";
import BackupIcon from "@mui/icons-material/Backup";

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    defaultInterestRate: 10.5,
    minTenureMonths: 6,
    maxTenureMonths: 60,
    maxLoanAmount: 5000000,
    autoApproveUnder50k: true,
    emailNotifications: true,
    twoFactorAuth: true,
    auditLogging: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <PageHeader
          title="Bank-U System Configuration & Settings"
          subtitle="Configure interest rules, tenure bounds, security policies, and automated workflows"
          breadcrumbs={[{ label: "Settings", path: "/admin/settings" }]}
        />

        {saved && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
            System configuration parameters updated successfully!
          </Alert>
        )}

        <Paper sx={{ borderRadius: 4, p: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)}>
              <Tab icon={<TuneIcon />} iconPosition="start" label="Loan Policy & Rules" />
              <Tab icon={<SecurityIcon />} iconPosition="start" label="Security & Audit Controls" />
              <Tab icon={<SettingsIcon />} iconPosition="start" label="Bank-U Platform Info" />
            </Tabs>
          </Box>

          <form onSubmit={handleSave}>
            {activeTab === 0 && (
              <Stack spacing={3}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Interest Rate & Tenure Constraints
                </Typography>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Base Interest Rate (% p.a.)"
                      type="number"
                      value={settings.defaultInterestRate}
                      onChange={(e) => setSettings({ ...settings, defaultInterestRate: e.target.value })}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Maximum Sanction Limit (₹)"
                      type="number"
                      value={settings.maxLoanAmount}
                      onChange={(e) => setSettings({ ...settings, maxLoanAmount: e.target.value })}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Minimum Tenure (Months)"
                      type="number"
                      value={settings.minTenureMonths}
                      onChange={(e) => setSettings({ ...settings, minTenureMonths: e.target.value })}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Maximum Tenure (Months)"
                      type="number"
                      value={settings.maxTenureMonths}
                      onChange={(e) => setSettings({ ...settings, maxTenureMonths: e.target.value })}
                    />
                  </Grid>
                </Grid>

                <Divider />

                <Typography variant="subtitle1" fontWeight={700}>
                  Automated Decision Engine
                </Typography>
                <Stack spacing={1}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.autoApproveUnder50k}
                        onChange={(e) => setSettings({ ...settings, autoApproveUnder50k: e.target.checked })}
                      />
                    }
                    label="Auto-Approve Micro Loans (< ₹50,000) for CIBIL > 750"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                      />
                    }
                    label="Instant SMS & Email Alerts on Status Change"
                  />
                </Stack>
              </Stack>
            )}

            {activeTab === 1 && (
              <Stack spacing={3}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Enterprise Security Controls
                </Typography>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.twoFactorAuth}
                        onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                      />
                    }
                    label="Enforce Two-Factor Authentication (2FA) for All Bank Officers"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.auditLogging}
                        onChange={(e) => setSettings({ ...settings, auditLogging: e.target.checked })}
                      />
                    }
                    label="Enable 256-Bit Cryptographic Transaction & Audit Logging"
                  />
                </Stack>

                <Divider />

                <Typography variant="subtitle1" fontWeight={700}>
                  System Maintenance
                </Typography>
                <Button variant="outlined" startIcon={<BackupIcon />} sx={{ width: "fit-content" }}>
                  Create Instant Database Backup
                </Button>
              </Stack>
            )}

            {activeTab === 2 && (
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Bank-U SaaS Engine Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary">Version</Typography>
                    <Typography variant="subtitle2" fontWeight={700}>Bank-U v2.4.0 (Enterprise)</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary">Environment</Typography>
                    <Typography variant="subtitle2" fontWeight={700}>Production Banking Cluster</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary">Encryption Standard</Typography>
                    <Typography variant="subtitle2" fontWeight={700}>AES-256 GCM</Typography>
                  </Grid>
                </Grid>
              </Stack>
            )}

            <Box sx={{ mt: 4 }}>
              <Button type="submit" variant="contained" startIcon={<SaveIcon />} size="large">
                Save System Configuration
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </DashboardLayout>
  );
}
