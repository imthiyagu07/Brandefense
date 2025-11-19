import express from "express";
import Mention from "../models/Mention.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const {brand, sentiment, source, q, page=1, limit=20} = req.query;

    const filter = {};

    if (brand) filter.brand = brand;
    if (sentiment) filter.sentiment = sentiment;
    if (source) filter.source = source;
    if (q) filter.text = {$regex: q, $options: "i"};

    const mentions = await Mention.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));

    res.json(mentions);
});

export default router;