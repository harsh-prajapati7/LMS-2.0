const Loan = require("../models/Loan");
const User = require("../models/User");
const calculateEMI = require("../utils/calculateEMI");

// =============================
// APPLY LOAN
// =============================
const applyLoan = async (req, res) => {
  try {
    const {
      customer,
      loanAmount,
      interestRate,
      duration,
      remarks,
    } = req.body;

    // Required fields
    if (
      !customer ||
      !loanAmount ||
      !interestRate ||
      !duration
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // Verify customer exists
    const customerExists = await User.findOne({
      _id: customer,
      role: "customer",
      isActive: true,
    });

    if (!customerExists) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Calculate EMI
    const emi = calculateEMI(
      loanAmount,
      interestRate,
      duration
    );

    // Create loan
    const loan = await Loan.create({
      customer,
      loanAmount,
      interestRate,
      duration,
      emi: Number(emi.toFixed(2)),
      remarks,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Loan application created successfully",
      loan,
    });

  } catch (error) {
    console.error("===== APPLY LOAN ERROR =====");
    console.error(error);
    console.error("============================");

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
}};

// ======================================
// GET ALL LOANS
// ======================================

// ======================================
// GET ALL LOANS
// ======================================

const getAllLoans = async (req, res) => {
  try {

    const {
      search,
      status,
      employee,
      minAmount,
      maxAmount,
      page = 1,
      limit = 10,
      sort = "-createdAt",
    } = req.query;

    const query = {};

    // Status Filter
    if (status) {
      query.status = status;
    }

    // Employee Filter
    if (employee) {
      query.employee = employee;
    }

    // Loan Amount Filter
    if (minAmount || maxAmount) {

      query.loanAmount = {};

      if (minAmount)
        query.loanAmount.$gte = Number(minAmount);

      if (maxAmount)
        query.loanAmount.$lte = Number(maxAmount);
    }

    // Customer Search
    if (search) {

      const customers = await User.find({
        fullName: {
          $regex: search,
          $options: "i",
        },
      });

      query.customer = {
        $in: customers.map(c => c._id),
      };
    }

    const totalLoans = await Loan.countDocuments(query);

    const loans = await Loan.find(query)
      .populate("customer", "fullName email phone")
      .populate("employee", "fullName email")
      .populate("createdBy", "fullName")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({

      success: true,

      pagination: {

        totalLoans,

        currentPage: Number(page),

        totalPages: Math.ceil(totalLoans / limit),

        pageSize: Number(limit),

      },

      loans,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }
};

// ======================================
// GET LOAN BY ID
// ======================================

const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;

    const loan = await Loan.findById(id)
      .populate("customer", "fullName email phone")
      .populate("employee", "fullName email")
      .populate("createdBy", "fullName email")
      .populate("updatedBy", "fullName email");

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }

    res.status(200).json({
      success: true,
      loan,
    });

  } catch (error) {

    console.error("===== GET LOAN BY ID ERROR =====");
    console.error(error);
    console.error("================================");

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// ASSIGN EMPLOYEE TO LOAN
// ======================================

const assignEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    // Find Loan
    const loan = await Loan.findById(id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }

    // Find Employee
    const employee = await User.findOne({
      _id: employeeId,
      role: "employee",
      isActive: true,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    loan.employee = employee._id;
    loan.status = "Assigned";
    loan.updatedBy = req.user._id;

    await loan.save();

    const updatedLoan = await Loan.findById(loan._id)
      .populate("customer", "fullName email")
      .populate("employee", "fullName email");

    res.status(200).json({
      success: true,
      message: "Employee assigned successfully",
      loan: updatedLoan,
    });

  } catch (error) {

    console.error("===== ASSIGN EMPLOYEE ERROR =====");
    console.error(error);
    console.error("=================================");

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// APPROVE LOAN
// ======================================

const approveLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const loan = await Loan.findById(id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }

    if (loan.status === "Approved") {
      return res.status(400).json({
        success: false,
        message: "Loan already approved",
      });
    }

    if (loan.status === "Rejected") {
      return res.status(400).json({
        success: false,
        message: "Rejected loan cannot be approved",
      });
    }

    loan.status = "Approved";
    loan.approvedAt = new Date();
    loan.updatedBy = req.user._id;

    await loan.save();

    res.status(200).json({
      success: true,
      message: "Loan approved successfully",
      loan,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ======================================
// REJECT LOAN
// ======================================

const rejectLoan = async (req, res) => {
  try {

    const { id } = req.params;
    const { rejectionReason } = req.body;

    const loan = await Loan.findById(id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }

    if (loan.status === "Rejected") {
      return res.status(400).json({
        success: false,
        message: "Loan already rejected",
      });
    }

    if (loan.status === "Approved") {
      return res.status(400).json({
        success: false,
        message: "Approved loan cannot be rejected",
      });
    }

    loan.status = "Rejected";
    loan.rejectedAt = new Date();
    loan.rejectionReason = rejectionReason || "";
    loan.updatedBy = req.user._id;

    await loan.save();

    res.status(200).json({
      success: true,
      message: "Loan rejected successfully",
      loan,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ======================================
// LOAN STATISTICS
// ======================================

const getLoanStats = async (req, res) => {
  try {

    const totalLoans = await Loan.countDocuments();

    const pendingLoans = await Loan.countDocuments({
      status: "Pending",
    });

    const assignedLoans = await Loan.countDocuments({
      status: "Assigned",
    });

    const approvedLoans = await Loan.countDocuments({
      status: "Approved",
    });

    const rejectedLoans = await Loan.countDocuments({
      status: "Rejected",
    });

    const closedLoans = await Loan.countDocuments({
      status: "Closed",
    });

    const totalLoanAmount = await Loan.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$loanAmount",
          },
        },
      },
    ]);

    const approvedLoanAmount = await Loan.aggregate([
      {
        $match: {
          status: "Approved",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$loanAmount",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,

      stats: {
        totalLoans,
        pendingLoans,
        assignedLoans,
        approvedLoans,
        rejectedLoans,
        closedLoans,

        totalLoanAmount:
          totalLoanAmount.length > 0
            ? totalLoanAmount[0].total
            : 0,

        approvedLoanAmount:
          approvedLoanAmount.length > 0
            ? approvedLoanAmount[0].total
            : 0,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ======================================
// LOAN DASHBOARD
// ======================================

const getLoanDashboard = async (req, res) => {
  try {

    const totalLoans = await Loan.countDocuments();

    const pendingLoans = await Loan.countDocuments({
      status: "Pending",
    });

    const assignedLoans = await Loan.countDocuments({
      status: "Assigned",
    });

    const approvedLoans = await Loan.countDocuments({
      status: "Approved",
    });

    const rejectedLoans = await Loan.countDocuments({
      status: "Rejected",
    });

    const totalCustomers = await User.countDocuments({
      role: "customer",
      isActive: true,
    });

    const totalEmployees = await User.countDocuments({
      role: "employee",
      isActive: true,
    });

    const recentLoans = await Loan.find()
      .populate("customer", "fullName")
      .populate("employee", "fullName")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      overview: {
        totalLoans,
        pendingLoans,
        assignedLoans,
        approvedLoans,
        rejectedLoans,
        totalCustomers,
        totalEmployees,
      },

      recentLoans,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

module.exports = {
  applyLoan,
  getAllLoans,
  getLoanById,
  assignEmployee,
  approveLoan,
  rejectLoan,
  getLoanStats,
  getLoanDashboard,
};