import createHttpError from "http-errors";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUserController = async (req, res, next) => {
  try {
    // validation
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    // database call
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const error = createHttpError(400, "Email already exists!");
      return next(error);
    }
    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).send({
      success: true,
      msg: "Sign up successfully!",
      user: newUser,
    });
  } catch (error) {
    return next(createHttpError(400, `Error with user sign up ${error}`));
  }
};

export const loginUserController = async (req, res, next) => {
  try {
    // validation
    const { email, password } = req.body;
    if (!email || !password) {
      return next(createHttpError(400, "All fields are required!"));
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(createHttpError(404, "User Not Found!"));
    }

    // process
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createHttpError(400, "Password is incorrect!"));
    }

    // token generation
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    // response
    res.status(201).send({
      success: true,
      message: "Login successfully",
      accessToken: token,
    });
  } catch (error) {
    return next(createHttpError(400, `Error with user login ${error}`));
  }
};
