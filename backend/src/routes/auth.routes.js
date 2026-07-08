const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getMe,
  logout,
} = require("../controllers/auth.controller");

const {
  protect,
  authorize,
} = require("../middleware/auth.middleware");

// ============================
// Public Routes
// ============================

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// ============================
// Protected Routes
// ============================

// Get Logged-in User
router.get("/me", protect, getMe);

// Logout User
router.get("/logout", protect, logout);

// ============================
// Role-Based Routes (Example)
// ============================

// Only Admin
router.get(
  "/admin",
  protect,
  authorize("ADMIN"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
      user: req.user,
    });
  }
);

// NGO or Admin
router.get(
  "/ngo",
  protect,
  authorize("NGO", "ADMIN"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome NGO",
      user: req.user,
    });
  }
);

// Donor
router.get(
  "/donor",
  protect,
  authorize("DONOR"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Donor",
      user: req.user,
    });
  }
);

// Recipient
router.get(
  "/recipient",
  protect,
  authorize("RECIPIENT"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Recipient",
      user: req.user,
    });
  }
);

module.exports = router;