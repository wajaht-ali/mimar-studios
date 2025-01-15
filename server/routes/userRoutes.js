import express from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/signup", registerUserController);
userRouter.post("/login", loginUserController);

export default userRouter;
