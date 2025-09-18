import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  // token from cookie first
  let token = req.cookies?.token;

  // if not in cookie, check header
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts[0] === "Bearer" && parts[1]) {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  const isBlacklisted = await userModel.findOne({token:token})
  if(isBlacklisted){
    return res.status(401).json({message: "Unauthorized"})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
