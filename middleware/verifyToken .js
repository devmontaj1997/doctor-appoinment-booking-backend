import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// create verify token

const verifyToken = (req, res, next) => {
  // get token
  const authHeader = req.headers.authorization;

  const token = authHeader.split(" ")[1];

  // token validation
  if (!token) {
    return res.status(400).json({ message: "Unauthorized user" });
  }

  // store valid user data
  let me = null;
  // verify token

  jwt.verify(
    token,
    process.env.logintoken,
    expressAsyncHandler(async (err, decode) => {
      if (err) {
        return res.status(400).json({ message: " invalid Token" });
      }

      if (decode.id) {
        me = await prisma.User.findUnique({
          where: {
            id: decode.id,
          },
        });
      }

      // remove sensitive data

      if (me) {
        delete me.password;
        delete me.id;

        // set data
        req.user = me;
        return next();
      }
    })
  );
};

// export verify token

export default verifyToken;
