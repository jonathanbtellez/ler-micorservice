import { getUsersService, postUserService, putUserService, getByIdService, removeService, findByEmailLikeService } from "../../service/users.js";
import  BadRequest  from "../../exception/bad_request.js";
import  NotFound  from "../../exception/not_found.js";
import { findAll, findByEmail, findById, remove, save, update, findByEmailLike } from "../../repository/user.js";

jest.mock("../../repository/user.js");
jest.mock("../../model/mapper.js");

describe("User Service Tests", () => {
  describe("getUsersService", () => {
    it("should return a list of users", async () => {
      const mockUsersData = [
        { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
        { id: 2, name: "Jane Doe", email: "jane@example.com", age: 28 }
      ];

      findAll.mockResolvedValueOnce(mockUsersData);

      const users = await getUsersService();

      expect(users).toEqual(mockUsersData);
    });

    it("should return list with a single user", async () => {
      const mockUsersData = [
        { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
      ];

      findAll.mockResolvedValueOnce(mockUsersData);

      expect(await getUsersService()).toHaveLength(1);
    })

    it("should handle empty database response", async () => {
      findAll.mockResolvedValueOnce([]);

      const users = await getUsersService();

      expect(users).toEqual([]);
    });

    it("should throw an error if query fails", async () => {
      findAll.mockRejectedValueOnce(new Error("Database query failed"));
      await expect(getUsersService()).rejects.toThrow("Database query failed");
    });
  });

  describe("postUserService", () => {
    it("should return a new user", async () => {
      const userPost = { id: 1, name: "John Doe", email: "john@example.com", age: 30 };
      findByEmail.mockResolvedValueOnce([]);
      save.mockResolvedValueOnce(userPost);

      const user = await postUserService(userPost);

      expect(user).toEqual(userPost);
    });

    it("should throw BadRequest if email is already in use", async () => {
      const userPost = { id: 1, name: "John Doe", email: "john@example.com", age: 30 };
      findByEmail.mockResolvedValueOnce([userPost]);

      await expect(postUserService(userPost)).rejects.toThrow(BadRequest);
    });
  });

  describe("putUserService", () => {
    it("should update an existing user", async () => {
      const userUpdate = { id: 1, name: "John Doe", email: "john@example.com", age: 30 };
      findById.mockResolvedValueOnce(userUpdate);
      update.mockResolvedValueOnce(userUpdate);

      const user = await putUserService(1, userUpdate);

      expect(user).toEqual(userUpdate);
    });

    it("should throw NotFound if user does not exist", async () => {
      const userUpdate = { id: 1, name: "John Doe", email: "john@example.com", age: 30 };
      findById.mockResolvedValueOnce(null);

      await expect(putUserService(1, userUpdate)).rejects.toThrow(NotFound);
    });
  });

  describe("getByIdService", () => {
    it("should return a user by id", async () => {
      const user = { id: 1, name: "John Doe", email: "john@example.com", age: 30 };
      findById.mockResolvedValueOnce(user);

      const result = await getByIdService(1);

      expect(result).toEqual(user);
    });

    it("should throw NotFound if user does not exist", async () => {
      findById.mockResolvedValueOnce(null);

      await expect(getByIdService(1)).rejects.toThrow(NotFound);
    });
  });

  describe("removeService", () => {
    it("should remove a user by id", async () => {
      const user = { id: 1, name: "John Doe", email: "john@example.com", age: 30 };
      findById.mockResolvedValueOnce(user);
      remove.mockResolvedValueOnce(user);

      const result = await removeService(1);

      expect(result).toEqual(user);
    });

    it("should throw NotFound if user does not exist", async () => {
      findById.mockResolvedValueOnce(null);

      await expect(removeService(1)).rejects.toThrow(NotFound);
    });
  });

  describe("findByEmailLikeService", () => {
    it("should return users with similar email", async () => {
      const users = [
        { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
        { id: 2, name: "Jane Doe", email: "jane@example.com", age: 28 }
      ];
      findByEmailLike.mockResolvedValueOnce(users);

      const result = await findByEmailLikeService("john");

      expect(result).toEqual(users);
    });

    it("should return an empty list if no users found", async () => {
      findByEmailLike.mockResolvedValueOnce([]);

      const result = await findByEmailLikeService("john");

      expect(result).toEqual([]);
    });
  });
});