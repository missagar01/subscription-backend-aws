import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Admin only
router.get("/", authMiddleware, getAllUsers);
router.post("/create", authMiddleware, createUser);
router.put("/update/:username", authMiddleware, updateUser);
router.delete("/delete/:username", authMiddleware, deleteUser);

export default router;
