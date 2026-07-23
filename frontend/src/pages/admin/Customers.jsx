import { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import SearchBar from "../../components/ui/SearchBar";
import CustomerTable from "../../components/tables/CustomerTable";
import CustomerForm from "../../components/forms/CustomerForm";
import { DeleteDialog } from "../../components/ui/Dialogs";

import { getCustomers, deleteCustomer } from "../../services/adminService";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletingCustomer, setDeletingCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data.customers || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setOpenForm(true);
  };

  const handleDeleteTrigger = (customer) => {
    setDeletingCustomer(customer);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingCustomer) return;
    try {
      setLoading(true);
      await deleteCustomer(deletingCustomer.id || deletingCustomer._id);
      loadCustomers();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setDeleteModal(false);
      setDeletingCustomer(null);
    }
  };

  const filteredCustomers = customers.filter((c) => {
    const query = search.toLowerCase();
    return (
      c.fullName?.toLowerCase().includes(query) ||
      c.email?.toLowerCase().includes(query) ||
      c.phone?.includes(query)
    );
  });

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <PageHeader
          title="Customer Borrowers Directory"
          subtitle="Manage verified borrower accounts, KYC status, and credit risk profiles"
          breadcrumbs={[{ label: "Customers", path: "/admin/customers" }]}
          action={
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingCustomer(null);
                setOpenForm(true);
              }}
            >
              Add New Customer
            </Button>
          }
        />

        {/* Top Customer KPI Cards */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Borrowers"
              value={customers.length || 24}
              change="+12%"
              icon={<PeopleIcon />}
              color="#1565C0"
              subtitle="Registered accounts"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="KYC Verified Rate"
              value="96.5%"
              change="+4.2%"
              icon={<VerifiedUserIcon />}
              color="#00C853"
              subtitle="Identity cleared"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Borrowers"
              value={customers.filter((c) => c.isActive !== false).length || 22}
              change="+8.1%"
              icon={<TrendingUpIcon />}
              color="#42A5F5"
              subtitle="Loans in repayment"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Avg Credit Score"
              value="762"
              change="+15 pts"
              icon={<AccountBalanceIcon />}
              color="#F59E0B"
              subtitle="CIBIL Average"
            />
          </Grid>
        </Grid>

        {/* Search & Filter Bar */}
        <Box sx={{ mb: 3 }}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search customers by name, email, or phone number..."
          />
        </Box>

        {/* Customer Table */}
        <CustomerTable
          customers={filteredCustomers}
          onEdit={handleEdit}
          onDelete={handleDeleteTrigger}
        />

        {/* Customer Add/Edit Form Dialog */}
        <CustomerForm
          open={openForm}
          customer={editingCustomer}
          handleClose={() => {
            setOpenForm(false);
            setEditingCustomer(null);
          }}
          refresh={loadCustomers}
        />

        {/* Delete Confirmation Modal */}
        <DeleteDialog
          open={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={confirmDelete}
          itemName={deletingCustomer?.fullName || "Customer"}
          loading={loading}
        />
      </Box>
    </DashboardLayout>
  );
}