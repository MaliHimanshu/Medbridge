const prisma = require("../config/prisma");

// ======================================
// Get Dashboard Statistics
// ======================================
const getDashboardStats = async () => {

  const [
    totalUsers,
    totalMedicines,
    totalDonations,
    pendingDonations,
    acceptedDonations,
    rejectedDonations,
    completedDonations,
    availableMedicines,
    lowStockMedicines,
    expiredMedicines,
  ] = await Promise.all([

    prisma.user.count(),

    prisma.medicine.count(),

    prisma.donation.count(),

    prisma.donation.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.donation.count({
      where: {
        status: "ACCEPTED",
      },
    }),

    prisma.donation.count({
      where: {
        status: "REJECTED",
      },
    }),

    prisma.donation.count({
      where: {
        status: "COMPLETED",
      },
    }),

    prisma.medicine.count({
      where: {
        status: "AVAILABLE",
      },
    }),

    prisma.medicine.count({
      where: {
        status: "LOW_STOCK",
      },
    }),

    prisma.medicine.count({
      where: {
        status: "EXPIRED",
      },
    }),

  ]);

  return {
    totalUsers,
    totalMedicines,
    totalDonations,

    donations: {
      pending: pendingDonations,
      accepted: acceptedDonations,
      rejected: rejectedDonations,
      completed: completedDonations,
    },

    medicines: {
      available: availableMedicines,
      lowStock: lowStockMedicines,
      expired: expiredMedicines,
    },
  };
};

module.exports = {
  getDashboardStats,
};