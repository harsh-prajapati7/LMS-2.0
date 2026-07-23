import { Card, CardContent, Grid, Typography } from "@mui/material";

function LoanStatsCards({ stats }) {
  const cards = [
    {
      title: "Total Loans",
      value: stats.totalLoans || 0,
    },
    {
      title: "Pending",
      value: stats.pending || 0,
    },
    {
      title: "Approved",
      value: stats.approved || 0,
    },
    {
      title: "Rejected",
      value: stats.rejected || 0,
    },
  ];

  return (
    <Grid container spacing={2} mb={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.title}>
          <Card elevation={3}>
            <CardContent>
              <Typography color="text.secondary">
                {card.title}
              </Typography>

              <Typography variant="h4" fontWeight="bold">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default LoanStatsCards;