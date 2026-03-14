import z from "zod";

export const loginSchema = z.object({
  phoneNo: z.string().min(1, "Phone no. is required"),
  password: z.string().min(6, "Must be at least 6 characters long"),
});
