const express = require("express");

const router = express.Router();

const {
  dashboardStats,
} = require("../controllers/dashboard.controller");

const {
  protect,
  authorize,
} = require("../middleware/auth.middleware");

// ======================================
// Dashboard
// ======================================
router.get(
  "/stats",
  protect,
  authorize("ADMIN"),
  dashboardStats
);

module.exports = router;