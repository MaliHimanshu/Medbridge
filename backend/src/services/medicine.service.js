const prisma = require("../config/prisma");

// ======================================
// Add Medicine
// ======================================
const addMedicine = async (data, ownerId) => {
  return await prisma.medicine.create({
    data: {
      ...data,
      manufactureDate: new Date(data.manufactureDate),
      expiryDate: new Date(data.expiryDate),
      ownerId,
    },
  });
};

// ======================================
// Get My Medicines
// ======================================
const getMyMedicines = async (ownerId) => {
  return await prisma.medicine.findMany({
    where: {
      ownerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// ======================================
// Get All Medicines
// ======================================
const getAllMedicines = async () => {
  return await prisma.medicine.findMany({
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// ======================================
// Get Medicine By ID
// ======================================
const getMedicineById = async (id) => {
  return await prisma.medicine.findUnique({
    where: {
      id,
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

// ======================================
// Update Medicine
// ======================================
const updateMedicine = async (id, data) => {
  if (data.manufactureDate) {
    data.manufactureDate = new Date(data.manufactureDate);
  }

  if (data.expiryDate) {
    data.expiryDate = new Date(data.expiryDate);
  }

  return await prisma.medicine.update({
    where: {
      id,
    },
    data,
  });
};

// ======================================
// Delete Medicine
// ======================================
const deleteMedicine = async (id) => {
  return await prisma.medicine.delete({
    where: {
      id,
    },
  });
};

// ======================================
// Search Medicines
// ======================================
const searchMedicines = async (query) => {
  const {
    name,
    manufacturer,
    category,
    type,
    status,
    page = 1,
    limit = 10,
  } = query;

  const where = {};

  if (name) {
    where.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  if (manufacturer) {
    where.manufacturer = {
      contains: manufacturer,
      mode: "insensitive",
    };
  }

  if (category) {
    where.category = {
      contains: category,
      mode: "insensitive",
    };
  }

  if (type) {
    where.type = type;
  }

  if (status) {
    where.status = status;
  }

  const medicines = await prisma.medicine.findMany({
    where,

    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },

    skip: (Number(page) - 1) * Number(limit),

    take: Number(limit),

    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.medicine.count({
    where,
  });

  return {
    total,
    page: Number(page),
    limit: Number(limit),
    medicines,
  };
};

// ======================================
// Get Low Stock Medicines
// ======================================
const getLowStockMedicines = async () => {
  const medicines = await prisma.medicine.findMany({
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      quantity: "asc",
    },
  });

  return medicines.filter(
    (medicine) => medicine.quantity <= medicine.minStock
  );
};

// ======================================
// Module Exports
// ======================================
module.exports = {
  addMedicine,
  getMyMedicines,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  searchMedicines,
  getLowStockMedicines,
};