import request from "supertest";
import app from "../app.js";
import mockingoose from "mockingoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");
jest.mock("bcryptjs");

describe("Auth Controller", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  describe("POST /auth/register", () => {
    it("should register a new user and return a token", async () => {
      const userData = {
        name: "John",
        email: "john@example.com",
        password: "password123",
      };

      mockingoose(User).toReturn(null, "findOne"); // Mock no existing user
      mockingoose(User).toReturn(userData, "save"); // Mock user creation

      bcrypt.hash.mockResolvedValue("hashedPassword");
      jwt.sign.mockReturnValue("testToken");

      const response = await request(app)
        .post("/api/auth/register")
        .send(userData);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.token).toBe("testToken");
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: expect.any(String) },
        expect.any(String),
        { expiresIn: "1h" }
      );
    });

    it("should return error if user already exists", async () => {
      const userData = {
        name: "John",
        email: "john@example.com",
        password: "password123",
      };

      mockingoose(User).toReturn(userData, "findOne"); // Mock existing user

      const response = await request(app)
        .post("/api/auth/register")
        .send(userData);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("User already exists");
    });
  });

  describe("POST /auth/login", () => {
    it("should login the user and return a token", async () => {
      const userData = {
        _id: "123",
        email: "john@example.com",
        password: "hashedPassword",
      };

      mockingoose(User).toReturn(userData, "findOne"); // Mock user found
      bcrypt.compare.mockResolvedValue(true); // Mock password match
      jwt.sign.mockReturnValue("testToken"); // Mock JWT token creation

      const response = await request(app).post("/api/auth/login").send({
        email: "john@example.com",
        password: "password123",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.token).toBe("testToken");
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: userData._id },
        expect.any(String),
        { expiresIn: "1h" }
      );
    });

    it("should return error for invalid email or password", async () => {
      mockingoose(User).toReturn(null, "findOne"); // Mock user not found

      const response = await request(app).post("/api/auth/login").send({
        email: "wrong@example.com",
        password: "password123",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Invalid email or password");
    });
  });
});
