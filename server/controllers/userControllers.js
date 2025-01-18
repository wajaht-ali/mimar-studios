import createHttpError from "http-errors";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { generateJwtToken, sendMail } from "../utils/helpers.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

export const googleSignupCOntroller = async (req, res, next) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: `${process.env.GOOGLE_CLIENT_ID}`,
    });
    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = new UserModel({
        googleId: sub,
        email,
        name,
      });
      await user.save();
    }
    const jwtToken = generateJwtToken({ userId: user._id, email });

    res.status(200).send({
      success: true,
      message: "Google signup successful",
      jwtToken,
      user,
    });
  } catch (error) {
    console.log("Error with Google signup:", error);
    return next(createHttpError(400, "Error with Google API"));
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

export const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(createHttpError(400, "false", "Email is required!"));
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(createHttpError(404, "false", "User not found!"));
    }

    const otpNumber = crypto.randomInt(100000, 999999);
    user.otp = otpNumber;
    await user.save();

    // send mail
    const message = `
      <h4>Dear ${user.name},</h4> <br>
      <p>You have requested to reset your password.</p>
      <p>Please copy and then paste the following OTP number in forgot password field.</p>
      <div style="width: full; display: flex; justify-items: center; align-items: center;">
      <p style="padding: 8px; background-color: #DFF2EB; color: #3C3D37; text-decoration: none; border-radius: 4px;">${otpNumber}</p>
      </div>
      <br>
      <br>
      <p>Please do not share this OTP with anyone. This OTP will automatically expire in next 90 seconds.</p>
      <a style="color: blue;" href="http://localhost:3000/reset-password/${otpNumber}">http://localhost:3000/reset-password/${otpNumber}</a>`;

    await sendMail(user.email, "Password Reset Request", message);
    if (!sendMail) {
      res.status(401).send({
        success: false,
        message: "Password reset link Error!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Password reset link sent to your email!",
    });
  } catch (error) {
    console.log(`Nodemailer error ${error}`);
    return next(
      createHttpError(400, "false", `Error with resetting password ${error}`)
    );
  }
};

export const googleLoginController = async (req, res, next) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: `${process.env.GOOGLE_CLIENT_ID}`,
    });
    const payload = ticket.getPayload();
    const { sub, email, name } = payload;
    const jwtToken = generateJwtToken({ userId: sub, email });

    const userMatch = await UserModel.findOne({ email: email });
    res.status(200).send({
      success: true,
      message: "Google login successful",
      jwtToken,
      user: {
        name,
        email,
        _id: userMatch ? userMatch._id : "",
      },
    });
  } catch (error) {
    console.log(`Error with google login ${error}`);
    return next(createHttpError(400, "false", "Error with google api"));
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
