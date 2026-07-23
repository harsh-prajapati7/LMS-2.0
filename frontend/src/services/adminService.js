import API from "../api/axios";

const defaultDemoCustomers = [
  { _id: "cust-1", id: "cust-1", fullName: "John Joseph", email: "harshprajapati0102@gmail.com", phone: "8794655376", isActive: true, creditScore: 780 },
  { _id: "cust-2", id: "cust-2", fullName: "Priya Sharma", email: "priya@gmail.com", phone: "+91 98765 43210", isActive: true, creditScore: 765 },
  { _id: "cust-3", id: "cust-3", fullName: "Rajesh Kumar", email: "rajesh@gmail.com", phone: "+91 98123 45678", isActive: true, creditScore: 720 },
  { _id: "cust-4", id: "cust-4", fullName: "Ananya Roy", email: "ananya@gmail.com", phone: "+91 97654 32109", isActive: true, creditScore: 690 },
];

const defaultDemoEmployees = [
  { _id: "emp-1", id: "emp-1", fullName: "Anita Sharma", email: "anita@bank-u.com", phone: "+91 98222 11100", role: "employee" },
  { _id: "emp-2", id: "emp-2", fullName: "Rahul Verma", email: "rahul@bank-u.com", phone: "+91 98333 22211", role: "employee" },
  { _id: "emp-3", id: "emp-3", fullName: "Suresh Patel", email: "suresh@bank-u.com", phone: "+91 98444 33322", role: "employee" },
];

// Dashboard
export const getDashboard = async () => {
  try {
    return await API.get("/admin/dashboard");
  } catch (err) {
    return {
      data: {
        dashboard: {
          totalLoans: 128,
          pendingLoans: 18,
          approvedLoans: 86,
          rejectedLoans: 12,
          totalCustomers: 240,
        },
      },
    };
  }
};

// Employees
export const getEmployees = async () => {
  try {
    const res = await API.get("/admin/employees");
    return res;
  } catch (err) {
    const local = JSON.parse(localStorage.getItem("bank_u_employees") || "[]");
    return {
      data: {
        employees: [...defaultDemoEmployees, ...local],
      },
    };
  }
};

export const createEmployee = async (data) => {
  try {
    return await API.post("/admin/employees", data);
  } catch (err) {
    const local = JSON.parse(localStorage.getItem("bank_u_employees") || "[]");
    const newEmp = { _id: "emp-" + Date.now(), id: "emp-" + Date.now(), ...data };
    local.push(newEmp);
    localStorage.setItem("bank_u_employees", JSON.stringify(local));
    return { data: { success: true, employee: newEmp } };
  }
};

export const updateEmployee = (id, data) => {
  return API.put(`/admin/employees/${id}`, data);
};

// Customers
export const getCustomers = async () => {
  try {
    const res = await API.get("/admin/customers");
    return res;
  } catch (err) {
    const local = JSON.parse(localStorage.getItem("bank_u_customers") || "[]");
    return {
      data: {
        customers: [...defaultDemoCustomers, ...local],
      },
    };
  }
};

export const createCustomer = async (data) => {
  try {
    return await API.post("/admin/customers", data);
  } catch (err) {
    const local = JSON.parse(localStorage.getItem("bank_u_customers") || "[]");
    const newCust = {
      _id: "cust-" + Date.now(),
      id: "cust-" + Date.now(),
      ...data,
      isActive: true,
      creditScore: Math.floor(Math.random() * 150) + 650,
    };
    local.push(newCust);
    localStorage.setItem("bank_u_customers", JSON.stringify(local));
    return { data: { success: true, customer: newCust } };
  }
};

export const updateCustomer = (id, data) => {
  return API.put(`/admin/customers/${id}`, data);
};

export const deleteCustomer = async (id) => {
  try {
    return await API.delete(`/admin/customers/${id}`);
  } catch (err) {
    let local = JSON.parse(localStorage.getItem("bank_u_customers") || "[]");
    local = local.filter((c) => c.id !== id && c._id !== id);
    localStorage.setItem("bank_u_customers", JSON.stringify(local));
    return { data: { success: true } };
  }
};

export const getCustomerLoanHistory = (id) => {
  return API.get(`/admin/customers/${id}/loans`);
};

export const getEmployee = (id) => API.get(`/admin/employees/${id}`);