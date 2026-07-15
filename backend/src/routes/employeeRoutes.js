const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    getEmployeeDashboard,
    getAssignedLoans,
    getAssignedLoanById,
    updateAssignedLoanStatus,
    getCustomerProfile,
    getEmployeeAnalytics,
} = require("../controllers/employeeController");

router.get(
  "/dashboard",
  protect,
  authorize("employee"),
  getEmployeeDashboard
);

router.get(
    "/loans",
    protect,
    authorize("employee"),
    getAssignedLoans
);

router.get(
    "/loans/:id",
    protect,
    authorize("employee"),
    getAssignedLoanById
);

router.get(
    "/customers/:id",
    protect,
    authorize("employee"),
    getCustomerProfile
);

router.get(
    "/analytics",
    protect,
    authorize("employee"),
    getEmployeeAnalytics
);

router.put(
    "/loans/:id/status",
    protect,
    authorize("employee"),
    updateAssignedLoanStatus
);

module.exports = router;