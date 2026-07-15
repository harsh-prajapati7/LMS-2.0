const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    getDashboardStats,
} = require("../controllers/dashboardController");

const {
    createEmployee,
    getAllEmployees,  
    getEmployeeById,
    updateEmployee,
} = require("../controllers/employeeController");

const {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deactivateCustomer,
    getCustomerLoanHistory,
} = require("../controllers/customerController");

// Dashboard
router.get("/dashboard",
    protect,
    authorize("admin"),
    getDashboardStats
);

// Create Employee
router.post("/employees",
    protect,
    authorize("admin"),
    createEmployee
);

// Get All Employees
router.get("/employees",
    protect,
    authorize("admin"),
    getAllEmployees
);

// Get Employee By ID
router.get("/employees/:id",
    protect,
    authorize("admin"),
    getEmployeeById
);

//Update Employee
router.put(
  "/employees/:id",
  protect,
  authorize("admin"),
  updateEmployee
);

router.post(
  "/customers",
  protect,
  authorize("admin"),
  createCustomer
);

router.get(
  "/customers",
  protect,
  authorize("admin"),
  getAllCustomers
);

router.get(
  "/customers/:id",
  protect,
  authorize("admin"),
  getCustomerById
);

router.put(
  "/customers/:id",
  protect,
  authorize("admin"),
  updateCustomer
);

router.delete(
  "/customers/:id",
  protect,
  authorize("admin"),
  deactivateCustomer
);

router.get(
  "/customers/:id/loans",
  protect,
  authorize("admin"),
  getCustomerLoanHistory
);

module.exports = router;