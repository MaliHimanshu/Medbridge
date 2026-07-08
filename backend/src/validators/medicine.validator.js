const { z } = require("zod");

const createMedicineSchema = z.object({
  name: z
    .string()
    .min(2, "Medicine name must be at least 2 characters"),

  genericName: z
    .string()
    .optional(),

  manufacturer: z
    .string()
    .min(2, "Manufacturer is required"),

  batchNumber: z
    .string()
    .min(2, "Batch number is required"),

  category: z
    .string()
    .min(2, "Category is required"),

  type: z.enum([
    "TABLET",
    "CAPSULE",
    "SYRUP",
    "INJECTION",
    "OINTMENT",
    "DROPS",
    "POWDER",
    "OTHER"
  ]),

  description: z
    .string()
    .optional(),

  quantity: z
    .number()
    .int()
    .positive(),

  minStock: z
    .number()
    .int()
    .positive()
    .default(10),

  unit: z
    .string()
    .min(1),

  image: z
    .string()
    .optional(),

  manufactureDate: z
    .string(),

  expiryDate: z
    .string(),
});

module.exports = {
  createMedicineSchema,
};