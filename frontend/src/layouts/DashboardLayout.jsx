import { Box, Container } from "@mui/material";
import Navbar from "../components/layout/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Navbar />

      <Container
        maxWidth="xl"
        disableGutters
        className="animate-fade-in"
        sx={{
          flexGrow: 1,
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 3, md: 4 },
        }}
      >
        {children}
      </Container>
    </Box>
  );
}