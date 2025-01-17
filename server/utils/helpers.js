import jwt from "jsonwebtoken";

export function generateJwtToken(user) {
  return jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}
