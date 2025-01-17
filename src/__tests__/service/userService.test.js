import { getUsersService } from "../../service/users.js"; 
import { pool } from "../../db/index.js"; 
import User from "../../model/user.js";

jest.mock("../../db/index.js", () => ({
  pool: {
    query: jest.fn()
  }
}));

describe("getUsersService", () => {
  it("should return a list of users", async () => {
    const mockUsersData = [
      { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
      { id: 2, name: "Jane Doe", email: "jane@example.com", age: 28 }
    ];
    
    pool.query.mockResolvedValueOnce({ rows: mockUsersData });

    const users = await getUsersService();

    expect(users).toEqual([
      new User(1, "John Doe", "john@example.com", 30),
      new User(2, "Jane Doe", "jane@example.com", 28)
    ]);
  });

  it("should handle empty database response", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const users = await getUsersService();

    expect(users).toEqual([]);
  });

  it("should throw an error if query fails", async () => {
    pool.query.mockRejectedValueOnce(new Error("Database query failed"));
    await expect(getUsersService()).rejects.toThrow("Database query failed");
  });
});
