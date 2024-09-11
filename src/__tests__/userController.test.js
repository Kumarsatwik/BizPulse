import request from "supertest";
import app from "../app.js";
import mockingoose from "mockingoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("User Controller", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  describe("GET /users", () => {
    it("should return users if authenticated", async () => {
      const userData = [{ name: "John", email: "john@example.com" }];

      jwt.verify.mockReturnValue({ id: "123" }); // Mock JWT verification
      mockingoose(User).toReturn(userData, "find"); // Mock users found

      const response = await request(app)
        .get("/api/users")
        .set("Authorization", "Bearer testToken");

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.length).toBe(1);
      expect(jwt.verify).toHaveBeenCalledWith("testToken", expect.any(String));
    });

    it("should return error if token is not provided", async () => {
      const response = await request(app).get("/api/users");

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("No token, authorization denied");
    });

    it("should return error if token is invalid", async () => {
      jwt.verify.mockImplementation(() => {
        throw new Error("Invalid token");
      });

      const response = await request(app)
        .get("/api/users")
        .set("Authorization", "Bearer invalidToken");

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Token is not valid");
    });
  });
});
