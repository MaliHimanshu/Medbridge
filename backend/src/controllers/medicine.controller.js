const { createMedicineSchema } = require("../validators/medicine.validator");

const {
  addMedicine,
  getMyMedicines,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  searchMedicines,
  getLowStockMedicines,
} = require("../services/medicine.service");

// ======================================
// Create Medicine
// ======================================
const createMedicine = async (req, res) => {
  try {
    const validatedData = createMedicineSchema.parse(req.body);

    const medicine = await addMedicine(validatedData, req.user.id);

    return res.status(201).json({
      success: true,
      message: "Medicine added successfully",
      medicine,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get My Medicines
// ======================================
const getMyMedicine = async (req, res) => {
  try {
    const medicines = await getMyMedicines(req.user.id);

    return res.status(200).json({
      success: true,
      total: medicines.length,
      medicines,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Medicines
// ======================================
const getMedicines = async (req, res) => {
  try {
    const medicines = await getAllMedicines();

    return res.status(200).json({
      success: true,
      total: medicines.length,
      medicines,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Search Medicines
// ======================================
const searchMedicine = async (req, res) => {
  try {
    const result = await searchMedicines(req.query);

    return res.status(200).json({
      success: true,
      total: result.total,
      page: result.page,
      limit: result.limit,
      medicines: result.medicines,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Low Stock Medicines
// ======================================
const lowStockMedicine = async (req, res) => {
  try {
    const medicines = await getLowStockMedicines();

    return res.status(200).json({
      success: true,
      total: medicines.length,
      medicines,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Medicine By ID
// ======================================
const getMedicine = async (req, res) => {
  try {
    const medicine = await getMedicineById(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    return res.status(200).json({
      success: true,
      medicine,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Medicine
// ======================================
const editMedicine = async (req, res) => {
  try {
    const medicine = await updateMedicine(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      medicine,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Medicine
// ======================================
const removeMedicine = async (req, res) => {
  try {
    await deleteMedicine(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMedicine,
  getMyMedicine,
  getMedicines,
  searchMedicine,
  lowStockMedicine,
  getMedicine,
  editMedicine,
  removeMedicine,
};