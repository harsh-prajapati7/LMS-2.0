import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PaymentsIcon from "@mui/icons-material/Payments";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const formatCurrency = (value) => {
  return Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
};

function LoanKPICards({ loans = [] }) {
  const totalApplications = loans.length;

  const approved = loans.filter(
    (loan) => loan.status === "Approved"
  ).length;

  const rejected = loans.filter(
    (loan) => loan.status === "Rejected"
  ).length;

  const pending = loans.filter(
    (loan) =>
      loan.status === "Pending" ||
      loan.status === "Assigned"
  ).length;

  const totalLoanAmount = loans.reduce(
    (sum, loan) => sum + Number(loan.loanAmount || 0),
    0
  );

  const totalEMI = loans.reduce(
    (sum, loan) => sum + Number(loan.emi || 0),
    0
  );

  const averageLoan =
    totalApplications > 0
      ? totalLoanAmount / totalApplications
      : 0;

  const averageEMI =
    totalApplications > 0
      ? totalEMI / totalApplications
      : 0;

  const approvalRate =
    totalApplications > 0
      ? ((approved / totalApplications) * 100).toFixed(1)
      : "0.0";

  const rejectionRate =
    totalApplications > 0
      ? ((rejected / totalApplications) * 100).toFixed(1)
      : "0.0";

  const cards = [
    {
      title: "Total Loan Amount",
      value: formatCurrency(totalLoanAmount),
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 42 }} />,
      color: "#1976d2",
    },
    {
      title: "Applications",
      value: totalApplications,
      icon: <DescriptionIcon sx={{ fontSize: 42 }} />,
      color: "#7b1fa2",
    },
    {
      title: "Approval Rate",
      value: `${approvalRate}%`,
      icon: <CheckCircleIcon sx={{ fontSize: 42 }} />,
      color: "#2e7d32",
    },
    {
      title: "Rejection Rate",
      value: `${rejectionRate}%`,
      icon: <CancelIcon sx={{ fontSize: 42 }} />,
      color: "#d32f2f",
    },
    {
      title: "Pending Loans",
      value: pending,
      icon: <PendingActionsIcon sx={{ fontSize: 42 }} />,
      color: "#ed6c02",
    },
    {
      title: "Average Loan",
      value: formatCurrency(averageLoan),
      icon: <TrendingUpIcon sx={{ fontSize: 42 }} />,
      color: "#00897b",
    },
    {
      title: "Average EMI",
      value: formatCurrency(averageEMI),
      icon: <PaymentsIcon sx={{ fontSize: 42 }} />,
      color: "#6a1b9a",
    },
    {
      title: "Total EMI",
      value: formatCurrency(totalEMI),
      icon: <CurrencyRupeeIcon sx={{ fontSize: 42 }} />,
      color: "#1565c0",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {cards.map((card, index) => (
        <Grid
          key={index}
          size={{ xs: 12, sm: 6, md: 3 }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              height: 150,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 8,
              },
            }}
          >
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {card.title}
              </Typography>

              <Typography
                variant="h5"
                fontWeight="bold"
                mt={1}
              >
                {card.value}
              </Typography>
            </Box>

            <Box sx={{ color: card.color }}>
              {card.icon}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default LoanKPICards;