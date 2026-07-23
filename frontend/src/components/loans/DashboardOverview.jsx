import { Grid } from "@mui/material";

import LoanKPICards from "./LoanKPICards";
import LoanAnalytics from "./LoanAnalytics";

function DashboardOverview({ loans }) {
  return (
    <Grid
      container
      spacing={3}
      sx={{ mb: 4 }}
    >
      <Grid size={12}>
        <LoanKPICards loans={loans} />
      </Grid>

      <Grid size={12}>
        <LoanAnalytics loans={loans} />
      </Grid>
    </Grid>
  );
}

export default DashboardOverview;