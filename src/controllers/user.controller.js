import userService from "../services/user.services.js";
import apiResponse from "../utils/apiResponse.js";

class UserController {
  async createUser(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      return apiResponse.successResponse(
        res,
        200,
        "User created successfully",
        user
      );
    } catch (error) {
      return apiResponse.errorResponse(res, 500, error.message);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return apiResponse.successResponse(
        res,
        200,
        "Users fetched successfully",
        users
      );
    } catch (error) {
      return apiResponse.errorResponse(res, 500, error.message);
    }
  }
}

export default new UserController();
