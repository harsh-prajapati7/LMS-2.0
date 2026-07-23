import API from "../api/axios";

const defaultDemoLoans = [
  {
    _id: "65a1234567890abcdef0001",
    loanAmount: 500000,
    interestRate: 10.5,
    duration: 24,
    emi: 23190,
    status: "Pending",
    createdAt: new Date().toISOString(),
    customer: { fullName: "Rajesh Kumar", email: "rajesh@gmail.com", phone: "+91 98123 45678" },
    employee: { fullName: "Anita Sharma", email: "anita@bank-u.com" },
  },
  {
    _id: "65a1234567890abcdef0002",
    loanAmount: 1200000,
    interestRate: 8.5,
    duration: 36,
    emi: 37890,
    status: "Approved",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    customer: { fullName: "Priya Sharma", email: "priya@gmail.com", phone: "+91 98765 43210" },
    employee: { fullName: "Rahul Verma", email: "rahul@bank-u.com" },
  },
  {
    _id: "65a1234567890abcdef0003",
    loanAmount: 350000,
    interestRate: 12.0,
    duration: 12,
    emi: 31100,
    status: "Assigned",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    customer: { fullName: "John Joseph", email: "harshprajapati0102@gmail.com", phone: "8794655376" },
    employee: { fullName: "Suresh Patel", email: "suresh@bank-u.com" },
  },
];

// Get all loans
export const getAllLoans = async () => {
  try {
    return await API.get("/loans");
  } catch (err) {
    const local = JSON.parse(localStorage.getItem("bank_u_loans") || "[]");
    return {
      data: {
        loans: [...defaultDemoLoans, ...local],
      },
    };
  }
};

// Get single loan
export const getLoan = async (id) => {
  try {
    return await API.get(`/loans/${id}`);
  } catch (err) {
    const local = JSON.parse(localStorage.getItem("bank_u_loans") || "[]");
    const all = [...defaultDemoLoans, ...local];
    const match = all.find((l) => l._id === id || l.id === id) || defaultDemoLoans[0];
    return {
      data: {
        loan: match,
      },
    };
  }
};

// Apply for a new loan
export const applyLoan = async (loanData) => {
  try {
    return await API.post("/loans/apply", loanData);
  } catch (err) {
    const local = JSON.parse(localStorage.getItem("bank_u_loans") || "[]");
    const newLoan = {
      _id: "65a1234567890" + Date.now().toString().slice(-7),
      id: "65a1234567890" + Date.now().toString().slice(-7),
      ...loanData,
      status: "Pending",
      createdAt: new Date().toISOString(),
      customer: { fullName: "Customer", email: "customer@bank-u.com" },
    };
    local.push(newLoan);
    localStorage.setItem("bank_u_loans", JSON.stringify(local));
    return { data: { success: true, loan: newLoan } };
  }
};

// Loan statistics
export const getLoanStats = async () => {
  try {
    return await API.get("/loans/stats");
  } catch (err) {
    return {
      data: {
        total: 128,
        pending: 18,
        approved: 86,
        rejected: 12,
      },
    };
  }
};

// Assign employee
export const assignEmployee = async (loanId, employeeId) => {
  try {
    return await API.put(`/loans/${loanId}/assign`, { employeeId });
  } catch (err) {
    return { data: { success: true } };
  }
};

// Approve loan
export const approveLoan = async (loanId, remarks) => {
  try {
    return await API.put(`/loans/${loanId}/approve`, { remarks });
  } catch (err) {
    return { data: { success: true } };
  }
};

// Reject loan
export const rejectLoan = async (loanId, remarks) => {
  try {
    return await API.put(`/loans/${loanId}/reject`, { remarks });
  } catch (err) {
    return { data: { success: true } };
  }
};

// Loan history
export const getLoanHistory = (id) => API.get(`/loans/${id}/history`);