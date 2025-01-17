import express from "express";
import cors from "cors";
import connectDB from "./services/db.js";
import { config } from "dotenv";
import globalErrorHandler from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRoutes.js";
config();

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*",
    methods: ["GET, POST, DELETE, PUT"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server is running!" });
});

// user rouets
app.use("/api", userRouter);


app.use(globalErrorHandler);
connectDB();

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
