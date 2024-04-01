import { z } from "zod";

export const userValidationSchema = z.object({
  name: z.string({ required_error: "name is required." }),
  email: z.string({ required_error: "Email is required." }).email(),
  password: z
    .string({ required_error: "password is required." })
    .min(6, { message: "Password must be more than 6 characters." }),
  bio: z.string(),
  profession: z.string(),
  address: z.string(),
});

export const UserValidation = {
  userValidationSchema,
};
