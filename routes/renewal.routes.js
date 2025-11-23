import { Router } from "express";
import {
    getPendingRenewals,
    getRenewalHistory,
    submitRenewal
} from "../controllers/renewalController.js";

const router = Router();

/* RENEWAL */
router.get("/pending", getPendingRenewals);
router.get("/history", getRenewalHistory);
router.post("/submit", submitRenewal);

export default router;
