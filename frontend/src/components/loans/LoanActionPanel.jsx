import { Stack, Button, Paper, Typography, Divider } from "@mui/material";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import generateLoanPDF from "../../utils/pdf/generateLoanPDF";

function LoanActionPanel({
  loan,
  onAssign,
  onApprove,
  onReject,
  onEdit,
  onDelete,
  onDownload,
}) {
  const handleDownload = () => {
    if (onDownload) {
      onDownload(loan);
    } else {
      generateLoanPDF(loan);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Loan Actions
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        useFlexGap
      >
        <Button
          variant="contained"
          color="info"
          startIcon={<AssignmentIndIcon />}
          onClick={onAssign}
        >
          Assign Employee
        </Button>

        <Button
          variant="contained"
          color="success"
          startIcon={<CheckCircleIcon />}
          disabled={loan?.status === "Approved"}
          onClick={onApprove}
        >
          Approve
        </Button>

        <Button
          variant="contained"
          color="error"
          startIcon={<CancelIcon />}
          disabled={loan?.status === "Rejected"}
          onClick={onReject}
        >
          Reject
        </Button>

        <Button
          variant="outlined"
          color="warning"
          startIcon={<EditIcon />}
          onClick={onEdit}
        >
          Edit
        </Button>

        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
        >
          Delete
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleDownload}
        >
          Download PDF
        </Button>
      </Stack>
    </Paper>
  );
}

export default LoanActionPanel;