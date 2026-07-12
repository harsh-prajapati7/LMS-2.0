import { Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#edf2f7",
      }}
    >

      <Paper
        elevation={6}
        style={{
          width: 420,
          padding: 40,
          borderRadius: 15,
        }}
      >

        <Typography variant="h4" gutterBottom>

          Loan Management System

        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >

          Login to continue

        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate("/dashboard")}
        >

          Login

        </Button>

      </Paper>

    </div>

  );

}