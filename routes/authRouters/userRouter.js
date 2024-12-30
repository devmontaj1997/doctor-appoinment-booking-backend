import express from "express";
import {
  createUser,
  getUsers,
  userLogin,
  LoggedUser,
} from "../../controllers/authControllers/authControllers.js";
import verifyToken from "../../middleware/verifyToken .js";

// init express router

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.post("/login", userLogin);
userRouter.get("/me", verifyToken, LoggedUser);

// export userRouter

export default userRouter;
