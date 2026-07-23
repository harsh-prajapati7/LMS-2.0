import { useMemo } from "react";

import {
  Paper,
  Typography,
} from "@mui/material";

import {
  DataGrid,
} from "@mui/x-data-grid";

function PaymentSchedule({
  amount,
  interest,
  months,
}) {

  const rows = useMemo(() => {

    if (!amount || !months) return [];

    const r = interest / 12 / 100;

    const emi =
      (amount * r * Math.pow(1 + r, months)) /
      (Math.pow(1 + r, months) - 1);

    let balance = amount;

    const schedule = [];

    for (let i = 1; i <= months; i++) {

      const interestPaid = balance * r;

      const principalPaid =
        emi - interestPaid;

      balance -= principalPaid;

      schedule.push({
        id: i,

        month: i,

        emi: emi.toFixed(2),

        principal:
          principalPaid.toFixed(2),

        interest:
          interestPaid.toFixed(2),

        balance:
          Math.max(balance, 0).toFixed(2),
      });
    }

    return schedule;

  }, [amount, interest, months]);

  const columns = [

    {
      field: "month",
      headerName: "Month",
      width: 90,
    },

    {
      field: "emi",
      headerName: "EMI",
      flex: 1,
    },

    {
      field: "principal",
      headerName: "Principal",
      flex: 1,
    },

    {
      field: "interest",
      headerName: "Interest",
      flex: 1,
    },

    {
      field: "balance",
      headerName: "Balance",
      flex: 1,
    },

  ];

  return (

    <Paper sx={{ p: 3, mt: 3 }}>

      <Typography
        variant="h6"
        mb={2}
      >
        Payment Schedule
      </Typography>

      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSizeOptions={[12]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 12,
              page: 0,
            },
          },
        }}
      />

    </Paper>

  );
}

export default PaymentSchedule;