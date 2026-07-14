const User = require("../models/User");
const Loan = require("../models/Loan");

const getDashboardStats = async (req, res) => {
  try {
    // Execute all database queries in parallel
    const [
      totalCustomers,
      totalEmployees,
      totalLoans,
      pendingLoans,
      approvedLoans,
      rejectedLoans,
    ] = await Promise.all([
      User.countDocuments({ role: "customer" }),
      User.countDocuments({ role: "employee" }),
      Loan.countDocuments(),
      Loan.countDocuments({ status: "Pending" }),
      Loan.countDocuments({ status: "Approved" }),
      Loan.countDocuments({ status: "Rejected" }),
    ]);

    // Return dashboard statistics
    res.status(200).json({
      success: true,
      message: "Dashboard statistics fetched successfully",
      data: {
        totalCustomers,
        totalEmployees,
        totalLoans,
        pendingLoans,
        approvedLoans,
        rejectedLoans,
        generatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("===== DASHBOARD ERROR =====");
    console.error(error);
    console.error("===========================");

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    // Required fields
    if (!fullName || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing employee
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Create employee
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

const getAllEmployees = async (req, res) => {
  try {
    const { search } = req.query;

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // Base query
    const query = {
      role: "employee",
    };

    // Search
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    // Total matching employees
    const totalEmployees = await User.countDocuments(query);

    // Current page data
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
    console.error("===============================");

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await User.findOne({
      _id: id,
      role: "employee",
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
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone } = req.body;

    // Find only employee
    const employee = await User.findOne({
      _id: id,
      role: "employee",
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

    // Update fields
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

module.exports = {
  getDashboardStats,
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
};