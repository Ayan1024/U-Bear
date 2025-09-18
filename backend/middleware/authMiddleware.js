import userModel from "../models/userModel.js";
import captainModel from "../models/captainModel.js";
import jwt from "jsonwebtoken";
import blacklistToken from "../models/blacklistToken.js"

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

export const authCaptain = async (req, res, next) => {
  try {
    // Get token from cookie first, then header
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    // Check if token is blacklisted
    const isBlacklisted = await blacklistToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized, token is blacklisted" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find captain
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: "Unauthorized, captain not found" });
    }

    // Attach to request
    req.captain = captain; // you can also use req.captain if you prefer

    next();
  } catch (err) {
    console.error("AuthCaptain error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};