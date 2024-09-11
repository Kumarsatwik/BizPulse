import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class AuthService {
  async register(userData) {
    const { email, password } = userData;
    const existingUser = await userRepository.findUserByEmail(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;

    const user = await userRepository.createUser(userData);
    const token = this.generateToken(user._id);

    return { user, token };
  }

  async login(email, password) {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = this.generateToken(user._id);

    return { user, token };
  }

  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }
}

export default new AuthService();
