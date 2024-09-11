import express from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, userController.createUser)
  .get(authMiddleware, userController.getAllUsers);

export default router;
