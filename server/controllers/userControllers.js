import createHttpError from "http-errors";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    const user = await UserModel.findOne({ email: email });
    if (user) {
      const error = createHttpError(400, "false", "Email already exists!");
      return next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).send({
      success: true,
      message: "Sign up successfully!",
      user: newUser,
    });
  } catch (error) {
    return next(createHttpError(400, `Error with user sign up ${error}`));
  }
};

export const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(createHttpError(400, "All fields are required!"));
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(createHttpError(404, "User Not Found!"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createHttpError(400, "Password is incorrect!"));
    }

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).send({
      success: true,
      message: "Login successfully",
      accessToken: token,
      user,
    });
  } catch (error) {
    return next(createHttpError(400, `Error with user login ${error}`));
  }
};

export const updateUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.params.id;

    const existingUserMatch = await UserModel.findById(userId);
    if (!existingUserMatch) {
      return next(createHttpError(404, "false", "User not found!"));
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : existingUserMatch.password;

    const updatedUserData = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: name || existingUserMatch.name,
        email: email || existingUserMatch.email,
        password: hashedPassword,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "User updated successfully!",
      user: updatedUserData,
    });
  } catch (error) {
    return next(
      createHttpError(400, "false", `Error with updating user ${error}`)
    );
  }
};

export const getAllUsersController = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    if (users) {
      res.status(200).send({
        success: true,
        message: "All users fetched successfully!",
        users,
      });
    } else {
      res.status(201).send({
        success: false,
        message: "No users found!",
      });
    }
  } catch (error) {
    return next(
      createHttpError(
        400,
        "false",
        `Error with get all users controller. ${error}`
      )
    );
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createHttpError(401, "false", "User id not provided!"));
    }
    const user = await UserModel.findById(id);
    if (user) {
      res.status(200).send({
        success: true,
        message: "User fetched successfully!",
        user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No user found",
      });
    }
  } catch (error) {
    return next(
      createHttpError(
        400,
        "false",
        `Error with get single user controller ${error}`
      )
    );
  }
};
