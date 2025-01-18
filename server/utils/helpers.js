import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export function generateJwtToken(user) {
  return jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export const transporter = nodemailer.createTransport({
  host: `${process.env.EMAIL_HOST}` || "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.My_Email}`,
    pass: `${process.env.My_Email_Password}`,
  },
});

export const sendMail = async (to, subject, text) => {
  try {
    const isSend = await transporter.sendMail({
      from: "contact.chwajahat@gmail.com",
      to: to,
      subject: subject,
      html: text,
    });
    if (!isSend) {
      console.log("Email not sent");
      return false;
    }
  } catch (error) {
    console.log(`Error with sendMail: ${error}`);
    return false;
  }
};
