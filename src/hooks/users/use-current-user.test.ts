jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/stores/auth-user", () => ({
  useAuthUser: jest.fn(),
}));

// Mock the users service so importing `useCurrentUser` doesn't pull in network/ky
jest.mock("@/services/users", () => ({
  currentUserQueryKey: ["users", "me"],
  getCurrentUser: jest.fn(),
}));

import { useQuery } from "@tanstack/react-query";
import { useAuthUser } from "@/stores/auth-user";
import { useCurrentUser } from "./use-current-user";

describe("useCurrentUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls useQuery with enabled true when accessToken exists", () => {
    (useAuthUser as jest.Mock).mockImplementation((selector) => selector({ accessToken: "token" }));

    useCurrentUser();

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expect.anything(),
        queryFn: expect.any(Function),
        enabled: true,
        staleTime: 1000 * 60 * 5,
      }),
    );
  });

  it("calls useQuery with enabled false when accessToken is falsy", () => {
    (useAuthUser as jest.Mock).mockImplementation((selector) => selector({ accessToken: null }));

    useCurrentUser();

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      }),
    );
  });
});
