import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { authUser } from "../middleware/authMiddleware.js";
import { userRegister, userLogin, getUserProfile, userLogout } from "../controllers/userController.js";

//users/register
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userRegister
);

//users/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userLogin
);

//users/profile
router.get("/profile", authUser, getUserProfile)

//users/logout
router.get("/logout", userLogout)

export default router;
