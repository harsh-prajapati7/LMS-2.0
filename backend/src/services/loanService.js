import API from "../api/axios";

// =========================
// GET ALL LOANS
// =========================

export const getLoans = (params = {}) =>
  API.get("/loans", {
    params,
  });

// =========================
// GET SINGLE LOAN
// =========================

export const getLoan = (id) =>
  API.get(`/loans/${id}`);

// =========================
// APPLY LOAN
// =========================

export const applyLoan = (data) =>
  API.post("/loans/apply", data);

// =========================
// ASSIGN EMPLOYEE
// =========================

export const assignEmployee = (
  id,
  employeeId
) =>
  API.put(`/loans/${id}/assign`, {
    employeeId,
  });

// =========================
// APPROVE LOAN
// =========================

export const approveLoan = (id) =>
  API.put(`/loans/${id}/approve`);

// =========================
// REJECT LOAN
// =========================

export const rejectLoan = (
  id,
  rejectionReason
) =>
  API.put(`/loans/${id}/reject`, {
    rejectionReason,
  });

// =========================
// DASHBOARD
// =========================

export const getLoanDashboard = () =>
  API.get("/loans/dashboard");

// =========================
// LOAN STATS
// =========================

export const getLoanStats = () =>
  API.get("/loans/stats");