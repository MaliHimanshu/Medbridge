const express = require("express");

const router = express.Router();

const {
  createDonationRequest,
  getMyDonationRequests,
  getReceivedDonationRequests,
  getDonation,
  changeDonationStatus,
  removeDonation,
} = require("../controllers/donation.controller");

const {
  protect,
  authorize,
} = require("../middleware/auth.middleware");

// ======================================
// Create Donation Request
// DONOR
// ======================================
router.post(
  "/create",
  protect,
  authorize("DONOR"),
  createDonationRequest
);

// ======================================
// Get My Donations
// DONOR
// ======================================
router.get(
  "/my",
  protect,
  authorize("DONOR"),
  getMyDonationRequests
);

// ======================================
// Get Donations Received
// NGO
// ======================================
router.get(
  "/received",
  protect,
  authorize("NGO"),
  getReceivedDonationRequests
);

// ======================================
// Get Donation By ID
// ======================================
router.get(
  "/:id",
  protect,
  getDonation
);

// ======================================
// Update Donation Status
// NGO / ADMIN
// ======================================
router.put(
  "/status/:id",
  protect,
  authorize("NGO", "ADMIN"),
  changeDonationStatus
);

// ======================================
// Delete Donation
// DONOR / ADMIN
// ======================================
router.delete(
  "/delete/:id",
  protect,
  authorize("DONOR", "ADMIN"),
  removeDonation
);

module.exports = router;