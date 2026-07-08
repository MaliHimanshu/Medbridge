const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// ======================================
// Import Routes
// ======================================
const authRoutes = require("./routes/auth.routes");
const medicineRoutes = require("./routes/medicine.routes");
const donationRoutes = require("./routes/donation.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

// ======================================
// Security Middlewares
// ======================================
app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// ======================================
// Body Parsers
// ======================================
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// ======================================
// Logger
// ======================================
app.use(morgan("dev"));

// ======================================
// Home Route
// ======================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "MedBridge",
    version: "1.0.0",
    message: "🚀 MedBridge Backend Running Successfully",
    modules: [
      "Authentication",
      "Medicine Management",
      "Donation Management",
      "Dashboard"
    ]
  });
});

// ======================================
// API Routes
// ======================================

// Authentication
app.use("/api/auth", authRoutes);

// Medicine
app.use("/api/medicine", medicineRoutes);

// Donation
app.use("/api/donation", donationRoutes);

// Dashboard
app.use("/api/dashboard", dashboardRoutes);

// ======================================
// 404 Handler
// ======================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ======================================
// Global Error Handler
// ======================================
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:");
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;