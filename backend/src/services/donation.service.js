const prisma = require("../config/prisma");

// ======================================
// Create Donation Request
// ======================================
const createDonation = async (data, donorId) => {
  // Check medicine
  const medicine = await prisma.medicine.findUnique({
    where: {
      id: data.medicineId,
    },
  });

  if (!medicine) {
    throw new Error("Medicine not found");
  }

  if (medicine.quantity < data.quantity) {
    throw new Error("Not enough medicine quantity available");
  }

  const donation = await prisma.donation.create({
    data: {
      medicineId: data.medicineId,
      donorId: donorId,
      receiverId: data.receiverId,
      quantity: data.quantity,
      message: data.message,
      status: "PENDING",
    },
    include: {
      medicine: true,
      donor: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return donation;
};

// ======================================
// Get Donations Created By Donor
// ======================================
const getMyDonations = async (donorId) => {
  return await prisma.donation.findMany({
    where: {
      donorId,
    },
    include: {
      medicine: true,
      receiver: {
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
// Get Donations Received
// ======================================
const getReceivedDonations = async (receiverId) => {
  return await prisma.donation.findMany({
    where: {
      receiverId,
    },
    include: {
      medicine: true,
      donor: {
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
// Get Donation By ID
// ======================================
const getDonationById = async (id) => {
  return await prisma.donation.findUnique({
    where: {
      id,
    },
    include: {
      medicine: true,
      donor: true,
      receiver: true,
    },
  });
};

// ======================================
// Update Donation Status
// ======================================
const updateDonationStatus = async (id, status) => {
  return await prisma.donation.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

// ======================================
// Delete Donation
// ======================================
const deleteDonation = async (id) => {
  return await prisma.donation.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createDonation,
  getMyDonations,
  getReceivedDonations,
  getDonationById,
  updateDonationStatus,
  deleteDonation,
};