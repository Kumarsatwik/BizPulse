import authService from "../services/auth.services.js";
import apiResponse from "../utils/apiResponse.js";

class AuthController {
  async register(req, res, next) {
    try {
      const { user, token } = await authService.register(req.body);
      return apiResponse.successResponse(res, "User registered successfully", {
        user,
        token,
      });
    } catch (error) {
      return apiResponse.errorResponse(res, error.message);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      return apiResponse.successResponse(res, "User logged in successfully", {
        user,
        token,
      });
    } catch (error) {
      return apiResponse.errorResponse(res, error.message);
    }
  }
}

export default new AuthController();
