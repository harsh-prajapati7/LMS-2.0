import { Paper, Stack, Typography } from "@mui/material";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

function LoanSummary({ loans }) {
  const totalAmount = loans.reduce(
    (sum, loan) => sum + (loan.loanAmount || 0),
    0
  );

  const averageLoan =
    loans.length > 0 ? totalAmount / loans.length : 0;

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" mb={2}>
        Loan Summary
      </Typography>

      <Stack spacing={1}>
        <Typography>
          Total Loan Amount: {formatCurrency(totalAmount)}
        </Typography>

        <Typography>
          Average Loan: {formatCurrency(averageLoan)}
        </Typography>

        <Typography>
          Total Applications: {loans.length}
        </Typography>
      </Stack>
    </Paper>
  );
}

export default LoanSummary;
