import { endpoints } from "@/constants/config";
import { apiInstance } from "@/lib/api-instance";

jest.mock("@/lib/api-instance", () => ({
  apiInstance: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("@/constants/config", () => ({
  endpoints: {
    users: "/users",
    currentUser: "/users/me",
  },
}));

import {
  createUser,
  currentUserQueryKey,
  deleteUser,
  getCurrentUser,
  getUserById,
  getUsers,
} from "./users";

describe("users service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("exports the correct query key for current user", () => {
    expect(currentUserQueryKey).toEqual(["users", "me"]);
  });

  it("getUsers calls apiInstance.get and returns the parsed result", async () => {
    const mockResult = [{ id: 1, name: "Alice" }];
    (apiInstance.get as jest.Mock).mockReturnValue({
      json: jest.fn().mockResolvedValue(mockResult),
    });

    const res = await getUsers();

    expect(apiInstance.get).toHaveBeenCalledWith(endpoints.users);
    expect(res).toEqual(mockResult);
  });

  it("getCurrentUser calls apiInstance.get and returns the parsed user", async () => {
    const mockUser = { id: 2, name: "Bob" };
    (apiInstance.get as jest.Mock).mockReturnValue({ json: jest.fn().mockResolvedValue(mockUser) });

    const res = await getCurrentUser();

    expect(apiInstance.get).toHaveBeenCalledWith(endpoints.currentUser);
    expect(res).toEqual(mockUser);
  });

  it("getUserById calls apiInstance.get with the id", async () => {
    const mockUser = { id: 3, name: "Cara" };
    (apiInstance.get as jest.Mock).mockReturnValue({ json: jest.fn().mockResolvedValue(mockUser) });

    const res = await getUserById(3);

    expect(apiInstance.get).toHaveBeenCalledWith(`${endpoints.users}/3`);
    expect(res).toEqual(mockUser);
  });

  it("createUser posts to the users endpoint and returns created user", async () => {
    const payload = { name: "Dave" };
    const created = { id: 4, name: "Dave" };
    (apiInstance.post as jest.Mock).mockReturnValue({ json: jest.fn().mockResolvedValue(created) });

    const res = await createUser(payload);

    expect(apiInstance.post).toHaveBeenCalledWith(endpoints.users, { json: payload });
    expect(res).toEqual(created);
  });

  it("deleteUser calls apiInstance.delete with the id", async () => {
    (apiInstance.delete as jest.Mock).mockResolvedValue(undefined);

    await deleteUser(5);

    expect(apiInstance.delete).toHaveBeenCalledWith(`${endpoints.users}/5`);
  });
});
