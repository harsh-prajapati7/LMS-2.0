import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Divider,
} from "@mui/material";

const formatCurrency = (amount) =>
  Number(amount || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

function LoanDetailsDialog({ open, loan, onClose }) {
  if (!loan) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Loan Details</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Customer</Typography>
            <Typography>{loan.customer || "-"}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Employee</Typography>
            <Typography>{loan.employee || "Not Assigned"}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Loan Amount</Typography>
            <Typography>{formatCurrency(loan.loanAmount)}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">EMI</Typography>
            <Typography>{formatCurrency(loan.emi)}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Interest Rate</Typography>
            <Typography>{loan.interestRate}%</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Duration</Typography>
            <Typography>{loan.duration} Months</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Status</Typography>
            <Typography>{loan.status}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Remarks</Typography>
            <Typography>{loan.remarks || "-"}</Typography>
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoanDetailsDialog;