import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import DashboardHeader from "./DashboardHeader";
import StatCard from "./cards/StatCard";
import LoanChart from "./charts/LoanChart";
import LoanDistribution from "./charts/LoanDistribution";
import LoanTable from "./tables/LoanTable";
import QuickActions from "./widgets/QuickActions";
import ActivityTimeline from "./widgets/ActivityTimeline";

import {
    FaMoneyBillWave,
    FaUsers,
    FaClock,
    FaChartLine,
} from "react-icons/fa";

function DashboardContent() {
    return (
        <Box sx={{ p: 3 }}>
            <DashboardHeader />

            {/* Statistics */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Total Loans"
                        value="₹25.4L"
                        change="+12%"
                        icon={<FaMoneyBillWave />}
                        color="#2563eb"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Customers"
                        value={125}
                        change="+6%"
                        icon={<FaUsers />}
                        color="#22c55e"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Pending"
                        value={32}
                        change="-2%"
                        icon={<FaClock />}
                        color="#f59e0b"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Revenue"
                        value="₹1.87L"
                        change="+18%"
                        icon={<FaChartLine />}
                        color="#ef4444"
                    />
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, lg: 8 }}>
                    <LoanChart />
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                    <LoanDistribution />
                </Grid>
            </Grid>

            {/* Table + Actions */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 8 }}>
                    <LoanTable />
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                    <QuickActions />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <ActivityTimeline />
                </Grid>
            </Grid>
        </Box>
    );
}

export default DashboardContent;