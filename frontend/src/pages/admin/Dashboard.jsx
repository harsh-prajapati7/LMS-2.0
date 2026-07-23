import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardContent from "../../components/dashboard/DashboardContent";
import { getDashboard } from "../../services/adminService";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    dashboard: {
      totalLoans: 128,
      pendingLoans: 18,
      approvedLoans: 86,
      rejectedLoans: 12,
      totalCustomers: 240,
    },
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboard();
        if (response.data) {
          setDashboardData(response.data);
        }
      } catch (error) {
        console.error("Dashboard API offline or failed, using fallback metrics:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <DashboardLayout>
      <DashboardContent data={dashboardData} />
    </DashboardLayout>
  );
}

export default Dashboard;