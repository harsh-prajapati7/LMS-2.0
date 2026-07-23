import { useEffect, useState } from "react";
import { Box, Button, Grid, Stack } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import FilterToolbar from "../../components/ui/FilterToolbar";
import LoanTable from "../../components/loans/LoanTable";
import LoanForm from "../../components/loans/LoanForm";
import LoanSummary from "../../components/loans/LoanSummary";
import EMICalculator from "../../components/loans/EMICalculator";
import exportLoansToExcel from "../../utils/export/exportLoansToExcel";
import generateLoanPDF from "../../utils/pdf/generateLoanPDF";

import { getAllLoans, getLoanStats } from "../../services/loanService";

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [loanResponse, statsResponse] = await Promise.all([
        getAllLoans(),
        getLoanStats(),
      ]);
      setLoans(loanResponse.data.loans || []);
      setStats(statsResponse.data || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLoans = loans.filter((loan) => {
    const customer = loan.customer?.fullName?.toLowerCase() || "";
    const employee = loan.employee?.fullName?.toLowerCase() || "";
    const query = search.toLowerCase();

    const matchesSearch = customer.includes(query) || employee.includes(query);
    const matchesStatus = status === "All" || loan.status === status;

    let matchesDate = true;
    if (startDate) {
      matchesDate = matchesDate && new Date(loan.createdAt) >= new Date(startDate);
    }
    if (endDate) {
      matchesDate = matchesDate && new Date(loan.createdAt) <= new Date(endDate + "T23:59:59");
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setStartDate("");
    setEndDate("");
  };

  const exportExcel = () => {
    exportLoansToExcel(filteredLoans);
  };

  const exportPDF = () => {
    if (filteredLoans.length > 0) {
      generateLoanPDF(filteredLoans[0]);
    }
  };

  const totalCount = filteredLoans.length;
  const pendingCount = filteredLoans.filter((l) => l.status === "Pending").length;
  const approvedCount = filteredLoans.filter((l) => l.status === "Approved").length;
  const rejectedCount = filteredLoans.filter((l) => l.status === "Rejected").length;

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <PageHeader
          title="Loan Management Queue"
          subtitle="View, filter, assign, approve, and export loan portfolios"
          breadcrumbs={[{ label: "Loans Queue", path: "/admin/loans" }]}
          action={
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={loadData}
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlinedIcon />}
                onClick={() => setOpenForm(true)}
              >
                New Loan Application
              </Button>
            </Stack>
          }
        />

        {/* Quick KPI Stat Bar */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Filter Results"
              value={totalCount}
              icon={<AccountBalanceWalletIcon />}
              color="#1565C0"
              subtitle="Matching loans"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Review"
              value={pendingCount}
              icon={<PendingActionsIcon />}
              color="#F59E0B"
              subtitle="Awaiting officer"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Approved"
              value={approvedCount}
              icon={<CheckCircleOutlinedIcon />}
              color="#00C853"
              subtitle="Sanctioned applications"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Rejected"
              value={rejectedCount}
              icon={<CancelOutlinedIcon />}
              color="#EF4444"
              subtitle="Declined applications"
            />
          </Grid>
        </Grid>

        {/* Filter Toolbar */}
        <FilterToolbar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onReset={resetFilters}
          onExportExcel={exportExcel}
          onExportPDF={exportPDF}
          onRefresh={loadData}
        />

        {/* Loan DataGrid Table */}
        <LoanTable loans={filteredLoans} refresh={loadData} loading={loading} />

        {/* Loan Summary & EMI Calculator Grid */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <LoanSummary loans={filteredLoans} />
          </Grid>
          <Grid item xs={12} md={6}>
            <EMICalculator />
          </Grid>
        </Grid>

        {/* New Loan Modal Form */}
        <LoanForm
          open={openForm}
          handleClose={() => setOpenForm(false)}
          refresh={loadData}
        />
      </Box>
    </DashboardLayout>
  );
}