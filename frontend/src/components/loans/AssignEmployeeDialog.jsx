import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import { getEmployees } from "../../services/adminService";
import { assignEmployee } from "../../services/loanService";

function AssignEmployeeDialog({
  open,
  loan,
  onClose,
  refresh,
}) {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState("");

  useEffect(() => {
    if (open) {
      loadEmployees();
    }
  }, [open]);

  const loadEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data.employees || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssign = async () => {
    if (!loan || !employee) return;

    try {
      await assignEmployee(loan.id, employee);

      if (refresh) refresh();

      setEmployee("");
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to assign employee.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        Assign Underwriter / Loan Officer
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <TextField
          fullWidth
          select
          label="Select Employee"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        >
          {employees.map((emp) => (
            <MenuItem key={emp._id} value={emp._id}>
              {emp.fullName}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleAssign}
        >
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AssignEmployeeDialog;