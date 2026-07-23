import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";

import {
  approveLoan,
  rejectLoan,
} from "../../services/loanService";

function ApproveRejectDialog({
  open,
  loan,
  mode,
  onClose,
  refresh,
}) {
  const [remarks, setRemarks] = useState("");

  const handleSubmit = async () => {
    if (!loan) return;

    try {
      if (mode === "approve") {
        await approveLoan(loan.id, remarks);
      } else {
        await rejectLoan(loan.id, remarks);
      }

      if (refresh) refresh();

      setRemarks("");
      onClose();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Operation failed."
      );
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
        {mode === "approve"
          ? "Approve Loan Application"
          : "Reject Loan Application"}
      </DialogTitle>

      <DialogContent>
        <Typography mb={2}>
          {mode === "approve"
            ? "Are you sure you want to approve this loan?"
            : "Please provide a reason for rejecting this loan."}
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color={mode === "approve" ? "success" : "error"}
          onClick={handleSubmit}
        >
          {mode === "approve"
            ? "Approve"
            : "Reject"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ApproveRejectDialog;