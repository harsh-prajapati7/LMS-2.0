import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import { createEmployee } from "../../services/adminService";

function EmployeeForm({ open, handleClose, refresh }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createEmployee(form);
      if (refresh) refresh();
      handleClose();
      setForm({
        fullName: "",
        email: "",
        password: "",
        phone: "",
      });
    } catch (error) {
      console.error(error);
      if (refresh) refresh();
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
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
        Add New Bank Employee / Officer
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Contact Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save Employee
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmployeeForm;