import {
  Paper,
  Stack,
  TextField,
  MenuItem,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchBar from "./SearchBar";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function FilterToolbar({
  search,
  setSearch,
  status,
  setStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onReset,
  onExportExcel,
  onExportPDF,
  onRefresh,
  statusOptions = ["All", "Pending", "Approved", "Rejected", "Assigned"],
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
      >
        <Box sx={{ flexGrow: 1, maxWidth: { md: 360 } }}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search loans, customers, officers..."
            size="small"
          />
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems="center"
          sx={{ flexWrap: "wrap", gap: 1 }}
        >
          {statusOptions && (
            <TextField
              select
              size="small"
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ minWidth: 130 }}
            >
              {statusOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            type="date"
            size="small"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ minWidth: 140 }}
          />

          <TextField
            type="date"
            size="small"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ minWidth: 140 }}
          />

          <Stack direction="row" spacing={1}>
            {onReset && (
              <Tooltip title="Reset Filters">
                <Button
                  size="small"
                  variant="outlined"
                  color="inherit"
                  onClick={onReset}
                  startIcon={<FilterListIcon />}
                >
                  Reset
                </Button>
              </Tooltip>
            )}

            {onExportExcel && (
              <Button
                size="small"
                variant="outlined"
                color="success"
                startIcon={<FileDownloadIcon />}
                onClick={onExportExcel}
              >
                Excel
              </Button>
            )}

            {onExportPDF && (
              <Button
                size="small"
                variant="outlined"
                color="error"
                startIcon={<PictureAsPdfIcon />}
                onClick={onExportPDF}
              >
                PDF
              </Button>
            )}

            {onRefresh && (
              <Tooltip title="Refresh Data">
                <IconButton size="small" onClick={onRefresh} sx={{ border: "1px solid", borderColor: "divider" }}>
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
