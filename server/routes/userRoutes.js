import express from "express";
import {
  forgotPasswordController,
  getAllUsersController,
  getUserByIdController,
  googleLoginController,
  googleSignupCOntroller,
  loginUserController,
  registerUserController,
  updateUserController,
} from "../controllers/userControllers.js";
import { isLoggedIn } from "../middlewares/authMiddlewares.js";

const userRouter = express.Router();

userRouter.post("/signup", registerUserController);
userRouter.post("/google-signup", googleSignupCOntroller);
userRouter.post("/login", loginUserController);
userRouter.post("/forgot-password", forgotPasswordController);
userRouter.post("/google-login", googleLoginController);
userRouter.put("/update-user/:id", updateUserController);
userRouter.get("/user/:id", isLoggedIn, getUserByIdController);
userRouter.get("/users-list", isLoggedIn, getAllUsersController);

export default userRouter;
