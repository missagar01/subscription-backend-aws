import express from "express";
import {
  createSubscription,
  fetchSubscriptions,
  generateSubscriptionNo
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/create", createSubscription);
router.get("/all", fetchSubscriptions);
router.get("/generate-number", generateSubscriptionNo);

export default router;
