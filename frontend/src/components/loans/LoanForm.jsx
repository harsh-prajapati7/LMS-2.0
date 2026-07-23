import { useEffect, useMemo, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Divider,
  Box,
} from "@mui/material";

import { applyLoan } from "../../services/loanService";
import { getCustomers } from "../../services/adminService";

function LoanForm({ open, handleClose, refresh }) {
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    customer: "",
    loanAmount: "",
    interestRate: 10,
    duration: 12,
    remarks: "",
  });

  useEffect(() => {
    if (open) {
      loadCustomers();
    }
  }, [open]);

  const loadCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data.customers || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const calculation = useMemo(() => {
    const P = Number(form.loanAmount);
    const N = Number(form.duration);
    const annualRate = Number(form.interestRate);

    if (!P || !N || !annualRate) {
      return {
        emi: 0,
        totalPayment: 0,
        totalInterest: 0,
      };
    }

    const R = annualRate / 12 / 100;

    const emi =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    const totalPayment = emi * N;

    const totalInterest = totalPayment - P;

    return {
      emi,
      totalPayment,
      totalInterest,
    };
  }, [
    form.loanAmount,
    form.interestRate,
    form.duration,
  ]);

  const handleSubmit = async () => {
    try {
      await applyLoan({
        ...form,
        emi: Number(calculation.emi.toFixed(2)),
      });

      if (refresh) refresh();

      handleClose();

      setForm({
        customer: "",
        loanAmount: "",
        interestRate: 10,
        duration: 12,
        remarks: "",
      });
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to create loan."
      );
    }
  };

  const format = (v) =>
    Number(v).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 1.5,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <DialogTitle sx={{ pt: 2, px: 3, fontWeight: 700, fontSize: "1.25rem" }}>
        New Loan Application
      </DialogTitle>

      <DialogContent>

        <Grid container spacing={2} mt={1}>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Customer"
              name="customer"
              value={form.customer}
              onChange={handleChange}
            >
              {customers.map((customer) => (
                <MenuItem
                  key={customer._id}
                  value={customer._id}
                >
                  {customer.fullName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Loan Amount"
              type="number"
              name="loanAmount"
              value={form.loanAmount}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Interest Rate (%)"
              type="number"
              name="interestRate"
              value={form.interestRate}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Duration (Months)"
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Remarks"
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
            />
          </Grid>

        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          EMI Preview
        </Typography>

        <Grid container spacing={2}>

          <Grid item xs={4}>
            <Box>
              <Typography color="text.secondary">
                Monthly EMI
              </Typography>

              <Typography variant="h6">
                {format(calculation.emi)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box>
              <Typography color="text.secondary">
                Total Interest
              </Typography>

              <Typography variant="h6">
                {format(calculation.totalInterest)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box>
              <Typography color="text.secondary">
                Total Payment
              </Typography>

              <Typography variant="h6">
                {format(calculation.totalPayment)}
              </Typography>
            </Box>
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Apply Loan
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default LoanForm;