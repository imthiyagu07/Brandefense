import express from "express";
import Mention from "../models/Mention.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const pipeline = [
        { $match: { timestamp: { $gte: last24h } } },
        { $unwind: "$topics" },
        { $group: { _id: "$topics", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
    ];

    const topics = await Mention.aggregate(pipeline);

    res.json(topics);
});

export default router;