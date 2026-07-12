import {
  Box,
  TextField,
  Button,
  Stack,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";

function DashboardToolbar() {
    return (
        <Box
            sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
            }}
        >
            <TextField
                size="small"
                placeholder="Search loans..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    width: {
                        xs: "100%",
                        sm: 320,
                    },
                }}
            />

            <Stack
                direction="row"
                spacing={2}
            >
                <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                >
                    Filter
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                >
                    Export
                </Button>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                >
                    New Loan
                </Button>
            </Stack>
        </Box>
    );
}

export default DashboardToolbar;