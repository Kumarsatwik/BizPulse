import jwt from "jsonwebtoken";
import apiResponse from "../utils/apiResponse.js";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return apiResponse.errorResponse(res, "No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    return apiResponse.errorResponse(res, "Token is not valid");
  }
};

export default authMiddleware;
