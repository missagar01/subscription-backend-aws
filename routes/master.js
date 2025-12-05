import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await pool.query(`SELECT company_name FROM master ORDER BY company_name`);
        const names = result.rows.map(r => r.company_name);
        res.json({ companyName: names });
    } catch (err) {
        res.status(500).json({ error: "Failed to load master data" });
    }
});

export default router;
