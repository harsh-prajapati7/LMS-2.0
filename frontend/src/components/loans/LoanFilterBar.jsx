import {
  Stack,
  TextField,
  MenuItem,
  Button,
  Paper,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DownloadIcon from "@mui/icons-material/Download";

function LoanFilterBar({
  search,
  setSearch,
  status,
  setStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onExport,
  onReset,
}) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 3,
      }}
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={2}
      >
        <TextField
          fullWidth
          placeholder="Search customer or employee..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Assigned">Assigned</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </TextField>

        <TextField
          type="date"
          label="From"
          InputLabelProps={{
            shrink: true,
          }}
          value={startDate}
          onChange={(e) =>
            setStartDate(e.target.value)
          }
        />

        <TextField
          type="date"
          label="To"
          InputLabelProps={{
            shrink: true,
          }}
          value={endDate}
          onChange={(e) =>
            setEndDate(e.target.value)
          }
        />

        <Button
          variant="outlined"
          color="warning"
          startIcon={<RestartAltIcon />}
          onClick={onReset}
        >
          Reset
        </Button>

        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={onExport}
        >
          Export
        </Button>
      </Stack>
    </Paper>
  );
}

export default LoanFilterBar;