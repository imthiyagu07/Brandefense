import express from "express"
import { fetchTwitterMentions } from "../ingestion/twitter.js"
import { fetchRedditMentions } from "../ingestion/reddit.js"
import { fetchRSSMentions } from "../ingestion/rss.js"
import { fetchNewsMentions } from "../ingestion/news.js"

const router = express.Router();

router.get("/demo", async (req, res) => {
    const brand = req.query.brand || "Apple";

    await fetchTwitterMentions(brand);
    await fetchNewsMentions(brand);
    await fetchRSSMentions(brand);
    await fetchRedditMentions(brand);

    res.json({ message: "Demo mentions ingested!" });
})

export default router;