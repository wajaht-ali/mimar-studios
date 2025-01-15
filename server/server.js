import express from "express";
// import globalErrorhandler from "./middlewares/globalErrorHandler";
// import userRouter from "./routes/userRouter";
import cors from "cors";
import connectDB from "./services/db.js";
import { config } from "dotenv";
import globalErrorHandler from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRoutes.js";
config();

const app = express();
const port = process.env.PORT || 8080;

// cors
app.use(
  cors({
    origin: "*",
    methods: ["GET, POST, DELETE, PUT"],
    credentials: true,
  })
);

// json data configuration
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server is running!" });
});

app.use("/api", userRouter);


app.use(globalErrorHandler);

connectDB();

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
