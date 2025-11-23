import express from "express";
import {
  getAllSubscriptions,
  getMySubscriptions,
  getDashboardStats
} from "../controllers/dashboardController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// ADMIN
router.get("/all", authMiddleware, getAllSubscriptions);

// USER + ADMIN
router.get("/mine", authMiddleware, getMySubscriptions);

// DASHBOARD DATA
router.get("/dashboard", authMiddleware, getDashboardStats);

export default router;
