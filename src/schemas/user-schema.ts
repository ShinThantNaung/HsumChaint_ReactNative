import { z } from "zod";
import { monkProfileSchema } from "@/schemas/login-schema";

export const userSchema = z
  .object({
    id: z.number(),
    name: z.string().nullish(),
    username: z.string().nullish(),
    email: z.email().nullish(),
    phone: z.string().nullish(),
    contactNo: z.string().nullish(),
    contactPhone: z.string().nullish(),
    address: z.string().nullish(),
    role: z.string().nullish(),
    userType: z.enum(["User", "Monk"]).nullish(),
    avatarUrl: z.string().nullish(),
    createdAt: z.string().nullish(),
    monkProfile: monkProfileSchema.nullish(),
  })
  .catchall(z.unknown());

export const usersResponseSchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;
export type UsersResponse = z.infer<typeof usersResponseSchema>;
