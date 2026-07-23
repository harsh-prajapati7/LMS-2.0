import { useMemo, useState } from "react";

import {
  Paper,
  Typography,
  TextField,
  Grid,
  Divider,
  Box,
} from "@mui/material";

import PaymentSchedule from "./PaymentSchedule";

function EMICalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(10);
  const [months, setMonths] = useState(60);

  const calculation = useMemo(() => {
    if (!amount || !months || !rate) {
      return {
        emi: 0,
        totalPayment: 0,
        totalInterest: 0,
      };
    }

    const monthlyRate = rate / 12 / 100;

    const emi =
      (amount *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;

    const totalInterest = totalPayment - amount;

    return {
      emi,
      totalPayment,
      totalInterest,
    };
  }, [amount, rate, months]);

  const formatCurrency = (value) =>
    Number(value).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });

  return (
    <>
      <Paper sx={{ p: 3, mt: 4 }}>

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          EMI Calculator
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Loan Amount"
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(Number(e.target.value))
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Interest Rate (%)"
              type="number"
              value={rate}
              onChange={(e) =>
                setRate(Number(e.target.value))
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Duration (Months)"
              type="number"
              value={months}
              onChange={(e) =>
                setMonths(Number(e.target.value))
              }
            />
          </Grid>

        </Grid>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>

          <Grid item xs={12} md={4}>
            <Box>
              <Typography color="text.secondary">
                Monthly EMI
              </Typography>

              <Typography
                variant="h5"
                fontWeight="bold"
              >
                {formatCurrency(calculation.emi)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box>
              <Typography color="text.secondary">
                Total Interest
              </Typography>

              <Typography
                variant="h5"
                fontWeight="bold"
              >
                {formatCurrency(calculation.totalInterest)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box>
              <Typography color="text.secondary">
                Total Payment
              </Typography>

              <Typography
                variant="h5"
                fontWeight="bold"
              >
                {formatCurrency(calculation.totalPayment)}
              </Typography>
            </Box>
          </Grid>

        </Grid>

      </Paper>

      <PaymentSchedule
        amount={amount}
        interest={rate}
        months={months}
      />
    </>
  );
}

export default EMICalculator;