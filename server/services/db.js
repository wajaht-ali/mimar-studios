import mongoose from "mongoose";

const connectDB = async () => {
  const MONGODB_URL = process.env.MONGODB_URI;
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected!");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error with connecting database! ", err);
    });

    await mongoose.connect(MONGODB_URL);
  } catch (error) {
    console.log("Failed to connect to database: ", error);
    process.exit();
  }
};

export default connectDB;
