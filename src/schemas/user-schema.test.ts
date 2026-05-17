import { userSchema, usersResponseSchema } from "./user-schema";

describe("user schema", () => {
  it("parses a valid user", () => {
    const user = {
      id: 1,
      name: "Alice",
      username: "alice",
      email: "alice@example.com",
      userType: "User",
    } as const;

    const parsed = userSchema.parse(user);
    expect(parsed.id).toBe(1);
    expect(parsed.email).toBe("alice@example.com");
  });

  it("parses an array of users with usersResponseSchema", () => {
    const users = [
      {
        id: 2,
        name: "Bob",
        username: "bob",
        email: "bob@example.com",
        userType: "Monk",
      },
    ];

    const parsed = usersResponseSchema.parse(users);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed[0].name).toBe("Bob");
  });

  it("allows unknown extra keys because of catchall", () => {
    const withExtra = { id: 3, extra: "x" } as unknown as Record<string, unknown>;
    const parsed = userSchema.parse(withExtra);
    expect((parsed as any).extra).toBe("x");
  });
});
