import { useEffect, useState } from "react";
import { Box, Button, Grid, Paper, Typography, Stack, Avatar, LinearProgress, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BadgeIcon from "@mui/icons-material/Badge";
import SpeedIcon from "@mui/icons-material/Speed";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import EmployeeTable from "../../components/tables/EmployeeTable";
import EmployeeForm from "../../components/forms/EmployeeForm";

import { getEmployees } from "../../services/adminService";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data.employees || []);
    } catch (error) {
      console.error(error);
    }
  };

  const leaderboardData = [
    { name: "Anita Sharma", role: "Senior Loan Underwriter", approvals: 34, rating: "4.9 ★" },
    { name: "Rahul Verma", role: "Risk Assessment Officer", approvals: 29, rating: "4.8 ★" },
    { name: "Suresh Patel", role: "Verification Specialist", approvals: 25, rating: "4.7 ★" },
  ];

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <PageHeader
          title="Bank Employees & Loan Officers"
          subtitle="Manage loan verification team members, workload distribution, and approval metrics"
          breadcrumbs={[{ label: "Employees", path: "/admin/employees" }]}
          action={
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingEmployee(null);
                setOpenForm(true);
              }}
            >
              Add New Employee
            </Button>
          }
        />

        {/* Top Staff KPI Stats */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Staff Members"
              value={employees.length || 14}
              change="+2 this month"
              icon={<BadgeIcon />}
              color="#1565C0"
              subtitle="Loan officers team"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Avg SLA Turnaround"
              value="1.8 Days"
              change="-14% time"
              icon={<SpeedIcon />}
              color="#00C853"
              subtitle="Speed per application"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Monthly Approvals"
              value="142 Loans"
              change="+18.5%"
              icon={<CheckCircleOutlinedIcon />}
              color="#42A5F5"
              subtitle="Sanctioned by staff"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Top Performer"
              value="Anita Sharma"
              change="34 Sanctions"
              icon={<EmojiEventsIcon />}
              color="#F59E0B"
              subtitle="Leaderboard #1"
            />
          </Grid>
        </Grid>

        {/* Leaderboard & Target Progress Widget */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, borderRadius: 4, height: "100%" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Top Performing Loan Officers
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Staff members with highest sanction volume and SLA speed
                  </Typography>
                </Box>
                <Chip icon={<EmojiEventsIcon />} label="Monthly Leaderboard" color="warning" size="small" />
              </Stack>

              <Stack spacing={2} sx={{ mt: 2 }}>
                {leaderboardData.map((item, idx) => (
                  <Paper key={idx} variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ width: 42, height: 42, bgcolor: "primary.main", fontWeight: 700 }}>
                          #{idx + 1}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={700}>{item.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{item.role}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box textAlign="right">
                          <Typography variant="body2" fontWeight={700} color="success.main">
                            {item.approvals} Sanctioned
                          </Typography>
                          <Typography variant="caption" color="text.secondary">Rating {item.rating}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, borderRadius: 4, height: "100%" }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                Monthly Quota Progress
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>
                Overall team target vs actual approved loans
              </Typography>

              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight={600}>Personal Loans Quota</Typography>
                    <Typography variant="body2" fontWeight={700} color="primary.main">84% (42/50)</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={84} sx={{ height: 8, borderRadius: 4 }} />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight={600}>Home Loans Quota</Typography>
                    <Typography variant="body2" fontWeight={700} color="success.main">92% (23/25)</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={92} color="success" sx={{ height: 8, borderRadius: 4 }} />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight={600}>Business Credit Quota</Typography>
                    <Typography variant="body2" fontWeight={700} color="warning.main">68% (17/25)</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={68} color="warning" sx={{ height: 8, borderRadius: 4 }} />
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Employee Table */}
        <EmployeeTable
          employees={employees}
          onEdit={(emp) => {
            setEditingEmployee(emp);
            setOpenForm(true);
          }}
        />

        {/* Employee Add/Edit Form Dialog */}
        <EmployeeForm
          open={openForm}
          employee={editingEmployee}
          handleClose={() => {
            setOpenForm(false);
            setEditingEmployee(null);
          }}
          refresh={loadEmployees}
        />
      </Box>
    </DashboardLayout>
  );
}