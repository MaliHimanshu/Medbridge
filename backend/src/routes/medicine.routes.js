const express = require("express");

const router = express.Router();

const {
  createMedicine,
  getMyMedicine,
  getMedicines,
  getMedicine,
  searchMedicine,
  lowStockMedicine,
  editMedicine,
  removeMedicine,
} = require("../controllers/medicine.controller");

const {
  protect,
  authorize,
} = require("../middleware/auth.middleware");

// ======================================
// Create Medicine
// ======================================
router.post(
  "/add",
  protect,
  authorize("DONOR", "NGO"),
  createMedicine
);

// ======================================
// Get My Medicines
// ======================================
router.get(
  "/my",
  protect,
  authorize("DONOR", "NGO", "ADMIN"),
  getMyMedicine
);

// ======================================
// Get All Medicines
// ======================================
router.get(
  "/all",
  protect,
  authorize("ADMIN", "NGO"),
  getMedicines
);

// ======================================
// Search Medicines
// ======================================
router.get(
  "/search",
  protect,
  authorize("ADMIN", "DONOR", "NGO"),
  searchMedicine
);

// ======================================
// Get Low Stock Medicines
// ======================================
router.get(
  "/low-stock",
  protect,
  authorize("ADMIN", "DONOR", "NGO"),
  lowStockMedicine
);

// ======================================
// Get Medicine By ID
// ======================================
router.get(
  "/:id",
  protect,
  getMedicine
);

// ======================================
// Update Medicine
// ======================================
router.put(
  "/update/:id",
  protect,
  authorize("DONOR", "NGO"),
  editMedicine
);

// ======================================
// Delete Medicine
// ======================================
router.delete(
  "/delete/:id",
  protect,
  authorize("DONOR", "NGO", "ADMIN"),
  removeMedicine
);

module.exports = router;