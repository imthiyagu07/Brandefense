import axios from "axios";
import { saveMention } from "./saveMention.js";

export const fetchRedditMentions = async (brand) => {
    const sample = `${brand} discussion happening on Reddit`;

    return saveMention({
        brand,
        text: sample,
        source: "reddit",
        url: "https://reddit.com",
    });
};