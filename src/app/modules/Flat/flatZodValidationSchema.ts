import { z } from "zod";

// Define Zod validation schema
const flatValidationSchema = z.object({
  squareFeet: z.number().int(),
  totalBedrooms: z.number().int(),
  totalRooms: z.number().int(),
  utilitiesDescription: z.string(),
  location: z.string({ required_error: "name is required." }),
  description: z.string(),
  rent: z.number().int(),
  availability: z.boolean(),
  advanceAmount: z.number().int(),
  // Assuming booking ids are strings
});

export const FlatValidation = {
  flatValidationSchema,
};
