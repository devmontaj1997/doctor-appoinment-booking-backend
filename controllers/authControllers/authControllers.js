import expressAsyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// create All authControllers
/**
 * @description : this is a user get controller
 * @route : /api/v1/auth/users
 * @method: get
 * @access: public
 */

export const getUsers = expressAsyncHandler(async (req, res) => {
  const getAllUsers = await prisma.User.findMany();
  res.status(200).json({ getAllUsers, message: " here is your all users" });
});

// create All authControllers
/**
 * @description : this is a create user  controller
 * @route : /api/v1/auth/users
 * @method: post
 * @access: public
 */

export const createUser = expressAsyncHandler(async (req, res) => {
  const { name, email, userRole, password } = req.body;

  // validation
  if (!name || !email || !userRole || !password) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  // check already exit email

  const isEmailExist = await prisma.User.findUnique({
    where: {
      email,
    },
  });

  if (isEmailExist) {
    return res.status(400).json({ message: "This email already exists." });
  }

  // hash password
  const hasedPassword = await bcrypt.hash(password, 10);
  const createUser = await prisma.User.create({
    data: {
      name,
      email,
      userRole,
      password: hasedPassword,
    },
  });
  res.status(200).json({ createUser, message: " Registration successful" });
});
//  user login
/**
 * @description : this is a  user login controller
 * @route : /api/v1/auth/users/login
 * @method: post
 * @access: public
 */

export const userLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  // check already exit email

  const isEmailExist = await prisma.User.findUnique({
    where: {
      email,
    },
  });

  if (!isEmailExist) {
    return res.status(400).json({ message: "This email not exists." });
  }
  //check password valid or not

  const validPassword = await bcrypt.compare(password, isEmailExist.password);

  if (!validPassword) {
    return res.status(400).json({ message: " Wrong Password" });
  }
  // create Token
  const token = jwt.sign({ id: isEmailExist.id }, process.env.logintoken, {
    expiresIn: "7d",
  });

  res.status(200).json({ token, message: " Login  successfully" });
});


/**
 * @description: this is authorize user (me)  Controller
 * @route: /api/v1/user/me
 * @access: private
 * @method: post
 */

export const LoggedUser = expressAsyncHandler(async (req, res) => {
  const loggedUser = req.user;

  res.status(200).json({ loggedUser, message: " this is Logged User" });
});
