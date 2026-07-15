const User = require("../models/User");
const Loan = require("../models/Loan");

// =============================
// CREATE EMPLOYEE
// =============================
const createEmployee = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const employee = await User.create({
      fullName,
      email,
      password,
      phone,
      role: "employee",
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee: {
        id: employee._id,
        fullName: employee.fullName,
        email: employee.email,
        phone: employee.phone,
        role: employee.role,
      },
    });

  } catch (error) {

    console.error("===== CREATE EMPLOYEE ERROR =====");
    console.error(error);
    console.error("=================================");

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =============================
// GET ALL EMPLOYEES
// =============================
const getAllEmployees = async (req, res) => {
  try {
    const { search } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {
      role: "employee",
      isActive: true,
    };

    // Search
    if (search) {
      query.$or = [
        {
          fullName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const totalEmployees = await User.countDocuments(query);

    const employees = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,

      pagination: {
        currentPage: page,
        pageSize: limit,
        totalEmployees,
        totalPages: Math.ceil(totalEmployees / limit),
      },

      count: employees.length,

      employees,
    });

  } catch (error) {

    console.error("===== GET EMPLOYEES ERROR =====");
    console.error(error);
    console.error("================================");

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =============================
// GET EMPLOYEE BY ID
// =============================
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await User.findOne({
      _id: id,
      role: "employee",
      isActive: true,
    }).select("-password");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });

  } catch (error) {

    console.error("===== GET EMPLOYEE ERROR =====");
    console.error(error);
    console.error("==============================");

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =============================
// UPDATE EMPLOYEE
// =============================
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone } = req.body;

    const employee = await User.findOne({
      _id: id,
      role: "employee",
      isActive: true,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Check duplicate email
    if (email && email !== employee.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    if (fullName !== undefined)
      employee.fullName = fullName.trim();

    if (email !== undefined)
      employee.email = email.trim().toLowerCase();

    if (phone !== undefined)
      employee.phone = phone.trim();

    await employee.save();

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: {
        id: employee._id,
        fullName: employee.fullName,
        email: employee.email,
        phone: employee.phone,
        role: employee.role,
      },
    });

  } catch (error) {

    console.error("===== UPDATE EMPLOYEE ERROR =====");
    console.error(error);
    console.error("=================================");

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// EMPLOYEE DASHBOARD
// ======================================

const getEmployeeDashboard = async (req, res) => {
  try {

    const employeeId = req.user._id;

    const totalAssignedLoans = await Loan.countDocuments({
      employee: employeeId,
    });

    const pendingLoans = await Loan.countDocuments({
      employee: employeeId,
      status: "Assigned",
    });

    const approvedLoans = await Loan.countDocuments({
      employee: employeeId,
      status: "Approved",
    });

    const rejectedLoans = await Loan.countDocuments({
      employee: employeeId,
      status: "Rejected",
    });

    const recentLoans = await Loan.find({
      employee: employeeId,
    })
      .populate("customer", "fullName email phone")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      dashboard: {
        totalAssignedLoans,
        pendingLoans,
        approvedLoans,
        rejectedLoans,
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


// ======================================
// GET ASSIGNED LOANS
// ======================================

const getAssignedLoans = async (req, res) => {
  try {

    const {
      page = 1,
      limit = 10,
      status,
      search,
    } = req.query;

    const query = {
      employee: req.user._id,
    };

    if (status) {
      query.status = status;
    }

    if (search) {

      const customers = await User.find({
        fullName: {
          $regex: search,
          $options: "i",
        },
      }).select("_id");

      query.customer = {
        $in: customers.map(c => c._id),
      };

    }

    const totalLoans = await Loan.countDocuments(query);

    const loans = await Loan.find(query)
      .populate("customer", "fullName email phone")
      .sort({ createdAt: -1 })
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
// GET ASSIGNED LOAN BY ID
// ======================================

const getAssignedLoanById = async (req, res) => {
  try {

    const loan = await Loan.findOne({
      _id: req.params.id,
      employee: req.user._id,
    })
      .populate("customer", "fullName email phone")
      .populate("employee", "fullName email");

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

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ======================================
// UPDATE ASSIGNED LOAN STATUS
// ======================================

const updateAssignedLoanStatus = async (req, res) => {
  try {

    const { status, remarks } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Approved or Rejected",
      });
    }

    const loan = await Loan.findOne({
      _id: req.params.id,
      employee: req.user._id,
    });

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }

    if (loan.status !== "Assigned") {
      return res.status(400).json({
        success: false,
        message: "Only assigned loans can be updated",
      });
    }

    loan.status = status;
    loan.remarks = remarks || "";
    loan.updatedBy = req.user._id;

    if (status === "Approved") {
      loan.approvedAt = new Date();
    }

    if (status === "Rejected") {
      loan.rejectedAt = new Date();
      loan.rejectionReason = remarks || "";
    }

    await loan.save();

    res.status(200).json({
      success: true,
      message: `Loan ${status.toLowerCase()} successfully`,
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
// VIEW CUSTOMER PROFILE
// ======================================

const getCustomerProfile = async (req, res) => {
  try {

    const customer = await User.findOne({
      _id: req.params.id,
      role: "customer",
    }).select("-password");

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      customer,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ======================================
// EMPLOYEE ANALYTICS
// ======================================

const getEmployeeAnalytics = async (req, res) => {

    const employee = req.user._id;

    const total = await Loan.countDocuments({ employee });

    const assigned = await Loan.countDocuments({
        employee,
        status:"Assigned"
    });

    const approved = await Loan.countDocuments({
        employee,
        status:"Approved"
    });

    const rejected = await Loan.countDocuments({
        employee,
        status:"Rejected"
    });

    res.json({
        success:true,
        analytics:{
            total,
            assigned,
            approved,
            rejected
        }
    });

};


// =============================
// EXPORTS
// =============================
module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  getEmployeeDashboard,
  getAssignedLoans,
  getAssignedLoanById,
  updateAssignedLoanStatus,
  getCustomerProfile,
  getEmployeeAnalytics,
};