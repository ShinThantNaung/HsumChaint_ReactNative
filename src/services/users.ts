import { endpoints } from "@/constants/config";
import { apiInstance } from "@/lib/api-instance";
import { userSchema, usersResponseSchema } from "@/schemas/user-schema";

export const currentUserQueryKey = ["users", "me"] as const;

export const getUsers = async () => {
  return await apiInstance.get(endpoints.users).json(usersResponseSchema);
};

export const getCurrentUser = async () => {
  return await apiInstance.get(endpoints.currentUser).json(userSchema);
};

export const getUserById = async (id: number) => {
  return await apiInstance.get(`${endpoints.users}/${id}`).json(userSchema);
};

export const createUser = async (request: Record<string, unknown>) => {
  return await apiInstance.post(endpoints.users, { json: request }).json(userSchema);
};

export const deleteUser = async (id: number) => {
  await apiInstance.delete(`${endpoints.users}/${id}`);
};
