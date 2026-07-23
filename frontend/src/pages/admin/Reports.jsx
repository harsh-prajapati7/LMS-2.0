import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";

import AssessmentIcon from "@mui/icons-material/Assessment";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export default function Reports() {
  const [downloading, setDownloading] = useState(null);

  const reportList = [
    {
      id: "REP-01",
      title: "Monthly Portfolio Disbursement Report",
      category: "Portfolio Analytics",
      generated: "Today at 09:00 AM",
      size: "2.4 MB",
      type: "PDF",
    },
    {
      id: "REP-02",
      title: "NPA & Default Risk Assessment Report",
      category: "Risk Management",
      generated: "Yesterday at 05:30 PM",
      size: "1.8 MB",
      type: "Excel",
    },
    {
      id: "REP-03",
      title: "EMI Collection & Interest Revenue Audit",
      category: "Financial Audit",
      generated: "22 Jul 2026",
      size: "4.1 MB",
      type: "PDF",
    },
    {
      id: "REP-04",
      title: "KYC & Borrower Verification Summary",
      category: "Compliance",
      generated: "20 Jul 2026",
      size: "1.1 MB",
      type: "Excel",
    },
  ];

  const handleDownload = (id) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
    }, 1200);
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <PageHeader
          title="Bank-U Executive Financial Reports"
          subtitle="Generate, preview, and export portfolio statements, delinquency reports, and audit logs"
          breadcrumbs={[{ label: "Reports", path: "/admin/reports" }]}
          action={
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              onClick={() => handleDownload("all")}
            >
              Export Complete Q3 Report
            </Button>
          }
        />

        {/* Report Stats Summary */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Reports Generated"
              value="48 Reports"
              icon={<AssessmentIcon />}
              color="#1565C0"
              subtitle="This quarter"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Disbursed Volume"
              value="₹3.42 Cr"
              icon={<AccountBalanceWalletIcon />}
              color="#00C853"
              subtitle="YTD Sanctioned"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Interest Revenue Collected"
              value="₹28.40L"
              icon={<MonetizationOnIcon />}
              color="#42A5F5"
              subtitle="Q3 Earned Income"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="System Recovery Rate"
              value="98.2%"
              icon={<TrendingUpIcon />}
              color="#F59E0B"
              subtitle="On-time Repayment"
            />
          </Grid>
        </Grid>

        {/* Reports Download Center Table */}
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Generated Financial Statements & Audit Logs
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Download PDF or Excel formats for internal compliance and external reporting
              </Typography>
            </Box>
            <Chip label="Automated Nightly Sync" color="success" size="small" variant="outlined" />
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Report ID</TableCell>
                  <TableCell>Report Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Last Generated</TableCell>
                  <TableCell>File Size</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportList.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      <Chip label={row.id} size="small" sx={{ fontWeight: 700 }} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>{row.title}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{row.category}</Typography>
                    </TableCell>
                    <TableCell>{row.generated}</TableCell>
                    <TableCell>{row.size}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color={row.type === "PDF" ? "error" : "success"}
                        startIcon={row.type === "PDF" ? <PictureAsPdfIcon /> : <TableChartIcon />}
                        onClick={() => handleDownload(row.id)}
                        disabled={downloading === row.id}
                      >
                        {downloading === row.id ? "Exporting..." : `Download ${row.type}`}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </DashboardLayout>
  );
}
