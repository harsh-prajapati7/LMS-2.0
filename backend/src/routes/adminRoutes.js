const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getDashboardStats,
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} = require("../controllers/adminController");

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

module.exports = router;