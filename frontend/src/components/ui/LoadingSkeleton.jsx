import { Skeleton, Grid, Paper, Box, Stack } from "@mui/material";

export default function LoadingSkeleton({ type = "cards", count = 4 }) {
  if (type === "cards") {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: count }).map((_, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper sx={{ p: 2.5, borderRadius: 4 }}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="rectangular" width="80%" height={36} sx={{ my: 1.5, borderRadius: 2 }} />
              <Skeleton variant="text" width="40%" height={20} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (type === "table") {
    return (
      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 2 }} />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={50} sx={{ borderRadius: 2 }} />
          ))}
        </Stack>
      </Paper>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 4 }} />
    </Box>
  );
}
