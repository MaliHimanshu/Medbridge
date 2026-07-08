const {
  createDonationSchema,
  updateDonationStatusSchema,
} = require("../validators/donation.validator");

const {
  createDonation,
  getMyDonations,
  getReceivedDonations,
  getDonationById,
  updateDonationStatus,
  deleteDonation,
} = require("../services/donation.service");

// ======================================
// Create Donation
// ======================================
const createDonationRequest = async (req, res) => {
  try {
    const validatedData = createDonationSchema.parse(req.body);

    const donation = await createDonation(
      validatedData,
      req.user.id
    );

    return res.status(201).json({
      success: true,
      message: "Donation request created successfully",
      donation,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get My Donations
// ======================================
const getMyDonationRequests = async (req, res) => {
  try {
    const donations = await getMyDonations(req.user.id);

    return res.status(200).json({
      success: true,
      total: donations.length,
      donations,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Received Donations
// ======================================
const getReceivedDonationRequests = async (req, res) => {
  try {
    const donations = await getReceivedDonations(req.user.id);

    return res.status(200).json({
      success: true,
      total: donations.length,
      donations,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Donation By ID
// ======================================
const getDonation = async (req, res) => {
  try {
    const donation = await getDonationById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    return res.status(200).json({
      success: true,
      donation,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Donation Status
// ======================================
const changeDonationStatus = async (req, res) => {
  try {
    const validatedData = updateDonationStatusSchema.parse(req.body);

    const donation = await updateDonationStatus(
      req.params.id,
      validatedData.status
    );

    return res.status(200).json({
      success: true,
      message: "Donation status updated successfully",
      donation,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Donation
// ======================================
const removeDonation = async (req, res) => {
  try {
    await deleteDonation(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Donation deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDonationRequest,
  getMyDonationRequests,
  getReceivedDonationRequests,
  getDonation,
  changeDonationStatus,
  removeDonation,
};
