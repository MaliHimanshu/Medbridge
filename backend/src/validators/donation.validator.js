const { z } = require("zod");

const createDonationSchema = z.object({
  medicineId: z.string().min(1, "Medicine ID is required"),

  receiverId: z.string().min(1, "Receiver ID is required"),

  quantity: z.number().int().positive(),

  message: z.string().optional(),
});

const updateDonationStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "ACCEPTED",
    "REJECTED",
    "COMPLETED",
  ]),
});

module.exports = {
  createDonationSchema,
  updateDonationStatusSchema,
};