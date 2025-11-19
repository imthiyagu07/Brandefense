import express from "express";
import Alert from "../models/Alert.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(50);
    res.json(alerts);
});

export default router;