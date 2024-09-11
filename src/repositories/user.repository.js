import User from "../models/user.model.js";

class UserRepository {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async getAllUsers() {
    return await User.find();
  }
}

export default new UserRepository();
