import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const defaultPaperStyle = {
  borderRadius: 4,
  p: 1.5,
  border: "1px solid",
  borderColor: "divider",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
};

export function ConfirmationDialog({ open, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", loading = false }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: defaultPaperStyle }}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pt: 2, px: 2.5 }}>
        <Box sx={{ p: 1, borderRadius: 2.5, bgcolor: "warning.light", color: "warning.dark", display: "flex" }}>
          <WarningAmberRoundedIcon />
        </Box>
        <Typography variant="h6" fontWeight={700}>{title}</Typography>
      </DialogTitle>
      <DialogContent sx={{ px: 2.5, py: 1.5 }}>
        <DialogContentText sx={{ color: "text.secondary" }}>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 2.5, pb: 2 }}>
        <Button onClick={onClose} disabled={loading} variant="outlined" color="inherit">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} disabled={loading} variant="contained" color="primary">
          {loading ? "Processing..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function SuccessDialog({ open, onClose, title = "Action Successful", message = "The request has been processed successfully." }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { ...defaultPaperStyle, textAlign: "center", p: 3 } }}>
      <DialogContent sx={{ p: 0 }}>
        <Stack spacing={2} alignItems="center">
          <Box sx={{ width: 64, height: 64, borderRadius: "50%", bgcolor: "success.light", color: "success.main", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckCircleOutlineRoundedIcon sx={{ fontSize: 38 }} />
          </Box>
          <Typography variant="h6" fontWeight={700}>{title}</Typography>
          <Typography variant="body2" color="text.secondary">{message}</Typography>
          <Button onClick={onClose} variant="contained" color="success" fullWidth sx={{ mt: 1 }}>
            Done
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteDialog({ open, onClose, onConfirm, itemName = "item", loading = false }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: defaultPaperStyle }}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pt: 2, px: 2.5 }}>
        <Box sx={{ p: 1, borderRadius: 2.5, bgcolor: "error.light", color: "error.main", display: "flex" }}>
          <DeleteOutlinedIcon />
        </Box>
        <Typography variant="h6" fontWeight={700}>Delete {itemName}?</Typography>
      </DialogTitle>
      <DialogContent sx={{ px: 2.5, py: 1.5 }}>
        <DialogContentText sx={{ color: "text.secondary" }}>
          Are you sure you want to delete this {itemName.toLowerCase()}? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 2.5, pb: 2 }}>
        <Button onClick={onClose} disabled={loading} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} disabled={loading} variant="contained" color="error">
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
