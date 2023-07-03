import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserById,
  getUserProfile,
  getUsers,
  updateUserById,
  updateUserProfile,
  deleteUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .put(protect, updateUserProfile)
  .get(protect, getUserProfile);
router.route("/").get(protect, admin, getUsers).post(registerUser);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById)
  .delete(protect, admin, deleteUserById);

export default router;
