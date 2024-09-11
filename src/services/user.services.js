import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";

class UserService {
  async createUser(userData) {
    const { email, password } = userData;
    const existingUser = await userRepository.findUserByEmail(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;

    return await userRepository.createUser(userData);
  }

  async getAllUsers() {
    return await userRepository.getAllUsers();
  }
}

export default new UserService();
