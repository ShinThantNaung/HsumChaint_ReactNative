import z from "zod";

export const signUpSchema = z
  .object({
    phoneNo: z.string().min(1, "Phone no. is required"),
    password: z.string().min(6, "Must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Must be at least 6 characters long"),
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email address"),
    contactPhoneNo: z.string().min(1, "Contact phone no. is required"),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
