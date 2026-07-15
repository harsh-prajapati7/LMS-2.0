const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  applyLoan,
  getAllLoans,
  getLoanById,
  assignEmployee,
  approveLoan,
  rejectLoan,
  getLoanStats,
  getLoanDashboard,
} = require("../controllers/loanController");

// Apply Loan
router.post(
    "/apply",
    protect,
    authorize("admin"),
    applyLoan
);

router.get(
    "/",
    protect,
    authorize("admin"),
    getAllLoans
);

router.get(
  "/stats",
  protect,
  authorize("admin"),
  getLoanStats
);

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getLoanDashboard
);

router.get(
  "/:id",
  protect,
  authorize("admin"),
  getLoanById,
);

router.put(
  "/:id/assign",
  protect,
  authorize("admin"),
  assignEmployee
);

router.put(
  "/:id/approve",
  protect,
  authorize("admin"),
  approveLoan
);

router.put(
  "/:id/reject",
  protect,
  authorize("admin"),
  rejectLoan
);

module.exports = router;