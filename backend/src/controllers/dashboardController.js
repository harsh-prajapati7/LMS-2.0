const User = require("../models/User");
const Loan = require("../models/Loan");

const getDashboardStats = async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({
      role: "customer",
      isActive: true,
    });

    const totalEmployees = await User.countDocuments({
      role: "employee",
      isActive: true,
    });

    const totalLoans = await Loan.countDocuments();

    const pendingLoans = await Loan.countDocuments({
      status: "Pending",
    });

    const approvedLoans = await Loan.countDocuments({
      status: "Approved",
    });

    const rejectedLoans = await Loan.countDocuments({
      status: "Rejected",
    });

    const totalLoanAmount = await Loan.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$loanAmount" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalCustomers,
        totalEmployees,
        totalLoans,
        pendingLoans,
        approvedLoans,
        rejectedLoans,
        totalLoanAmount:
          totalLoanAmount.length > 0
            ? totalLoanAmount[0].total
            : 0,
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

module.exports = {
  getDashboardStats,
};