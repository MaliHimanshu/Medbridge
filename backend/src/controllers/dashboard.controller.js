const {
  getDashboardStats,
} = require("../services/dashboard.service");

// ======================================
// Dashboard Statistics
// ======================================
const dashboardStats = async (req, res) => {
  try {

    const stats = await getDashboardStats();

    return res.status(200).json({
      success: true,
      message: "Dashboard statistics fetched successfully",
      data: stats,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  dashboardStats,
};