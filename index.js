import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/authRouters/userRouter.js";
import errorHandller from "./errorHandller/errorHandller.js";

// dotenv config

dotenv.config();

// environment variable

const PORT = process.env.PORT || 8080;

// Init Express

const app = express();

// express middleWare
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use Router

app.use("/api/v1/auth/users", userRouter);
// error handller
app.use(errorHandller);
// App listener

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `.bgGreen.black);
});
