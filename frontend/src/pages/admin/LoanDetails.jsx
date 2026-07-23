import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  Avatar,
  Tab,
  Tabs,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/History";
import PaymentsIcon from "@mui/icons-material/Payments";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import StatusChip from "../../components/ui/StatusChip";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import PaymentSchedule from "../../components/loans/PaymentSchedule";
import AssignEmployeeDialog from "../../components/loans/AssignEmployeeDialog";
import ApproveRejectDialog from "../../components/loans/ApproveRejectDialog";
import LoanTimeline from "../../components/loans/LoanTimeline";
import LoanActionPanel from "../../components/loans/LoanActionPanel";
import generateLoanPDF from "../../utils/pdf/generateLoanPDF";

import { getLoan } from "../../services/loanService";

export default function LoanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignDialog, setAssignDialog] = useState(false);
  const [approveDialog, setApproveDialog] = useState(false);
  const [mode, setMode] = useState("approve");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    loadLoan();
  }, [id]);

  const loadLoan = async () => {
    try {
      setLoading(true);
      const res = await getLoan(id);
      setLoan(res.data.loan);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val) =>
    Number(val || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  if (loading) {
    return (
      <DashboardLayout>
        <Box p={3}>
          <LoadingSkeleton type="cards" count={4} />
        </Box>
      </DashboardLayout>
    );
  }

  if (!loan) {
    return (
      <DashboardLayout>
        <Box p={4}>
          <Alert severity="error" sx={{ borderRadius: 3 }}>
            Loan record not found.
          </Alert>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <PageHeader
          title={`Loan Details #${loan._id.slice(-6).toUpperCase()}`}
          subtitle="Comprehensive borrower profile, approval timeline, payment schedule, and documents"
          breadcrumbs={[
            { label: "Loans Queue", path: "/admin/loans" },
            { label: `Loan #${loan._id.slice(-6)}`, path: `#` },
          ]}
          action={
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>

              <Button
                variant="contained"
                startIcon={<FileDownloadIcon />}
                onClick={() => generateLoanPDF(loan)}
              >
                Export Statement PDF
              </Button>
            </Stack>
          }
        />

        {/* Status Header Banner */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(21, 101, 192, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)"
                : "linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%)",
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main", fontSize: "1.25rem", fontWeight: 700 }}>
                {loan.customer?.fullName ? loan.customer.fullName[0] : "B"}
              </Avatar>
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Typography variant="h5" fontWeight={700}>
                    {loan.customer?.fullName || "Borrower"}
                  </Typography>
                  <StatusChip status={loan.status} />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Application Date: {new Date(loan.createdAt || Date.now()).toLocaleDateString("en-IN")}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={3}>
              <Box textAlign="right">
                <Typography variant="caption" color="text.secondary">Sanctioned Amount</Typography>
                <Typography variant="h5" fontWeight={800} color="primary.main">
                  {formatCurrency(loan.loanAmount)}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography variant="caption" color="text.secondary">Monthly EMI</Typography>
                <Typography variant="h5" fontWeight={800} color="success.main">
                  {formatCurrency(loan.emi)}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Paper>

        {/* Customer & Officer Info Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", borderRadius: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                  <PersonIcon color="primary" />
                  <Typography variant="h6" fontWeight={700}>
                    Customer Information
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Full Name:</Typography>
                    <Typography variant="body2" fontWeight={600}>{loan.customer?.fullName}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Email Address:</Typography>
                    <Typography variant="body2" fontWeight={600}>{loan.customer?.email}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Contact Phone:</Typography>
                    <Typography variant="body2" fontWeight={600}>{loan.customer?.phone || "+91 98765 43210"}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Credit Score (CIBIL):</Typography>
                    <Typography variant="body2" fontWeight={700} color="success.main">765 (Excellent)</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", borderRadius: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                  <BadgeIcon color="secondary" />
                  <Typography variant="h6" fontWeight={700}>
                    Assigned Officer Information
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Officer Name:</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {loan.employee?.fullName || "Not Assigned Yet"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Email Address:</Typography>
                    <Typography variant="body2" fontWeight={600}>{loan.employee?.email || "-"}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Role:</Typography>
                    <Typography variant="body2" fontWeight={600}>Senior Underwriter</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Action Panel */}
        <Box sx={{ mb: 3 }}>
          <LoanActionPanel
            loan={loan}
            onAssign={() => setAssignDialog(true)}
            onApprove={() => {
              setMode("approve");
              setApproveDialog(true);
            }}
            onReject={() => {
              setMode("reject");
              setApproveDialog(true);
            }}
            onDownload={(item) => generateLoanPDF(item)}
          />
        </Box>

        {/* Navigation Tabs for Schedule, Documents & History */}
        <Paper sx={{ borderRadius: 4, p: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)}>
              <Tab icon={<PaymentsIcon />} iconPosition="start" label="Payment Schedule & EMI" />
              <Tab icon={<HistoryIcon />} iconPosition="start" label="Audit & Activity Log" />
              <Tab icon={<DescriptionIcon />} iconPosition="start" label="Documents Repository" />
            </Tabs>
          </Box>

          {activeTab === 0 && (
            <PaymentSchedule
              amount={loan.loanAmount}
              interest={loan.interestRate}
              months={loan.duration}
            />
          )}

          {activeTab === 1 && <LoanTimeline loan={loan} />}

          {activeTab === 2 && (
            <Grid container spacing={2}>
              {[
                { title: "Aadhaar Card Verification", size: "1.2 MB", status: "Verified" },
                { title: "PAN Card Copy", size: "850 KB", status: "Verified" },
                { title: "3 Months Salary Slips", size: "3.4 MB", status: "Verified" },
                { title: "Bank Account Statement", size: "4.8 MB", status: "Verified" },
              ].map((doc, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <DescriptionIcon color="primary" />
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>{doc.title}</Typography>
                          <Typography variant="caption" color="text.secondary">{doc.size}</Typography>
                        </Box>
                      </Stack>
                      <Button size="small" variant="outlined">Download</Button>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>

        {/* Dialog Modals */}
        <AssignEmployeeDialog
          open={assignDialog}
          loan={{ id: loan._id }}
          refresh={loadLoan}
          onClose={() => setAssignDialog(false)}
        />

        <ApproveRejectDialog
          open={approveDialog}
          loan={{ id: loan._id }}
          mode={mode}
          refresh={loadLoan}
          onClose={() => setApproveDialog(false)}
        />
      </Box>
    </DashboardLayout>
  );
}