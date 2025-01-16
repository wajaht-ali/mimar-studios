import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return next(
        createHttpError(
          401,
          "false",
          "Authorization header missing or malformed"
        )
      );
    }
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(createHttpError(401, "false", "Invalid Token!"));
    }
    req.user = decoded;
    next();
  } catch (error) {
    return next(
      createHttpError(401, "false", `Error with login middleware ${error}`)
    );
  }
};
