import express from "express";
import {
  getAllUsersController,
  getUserByIdController,
  loginUserController,
  registerUserController,
  updateUserController,
} from "../controllers/userControllers.js";
import { isLoggedIn } from "../middlewares/authMiddlewares.js";

const userRouter = express.Router();

userRouter.post("/signup", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.put("/update-user/:id", updateUserController);
userRouter.get("/user/:id", isLoggedIn, getUserByIdController);
userRouter.get("/users-list", isLoggedIn, getAllUsersController);

export default userRouter;
