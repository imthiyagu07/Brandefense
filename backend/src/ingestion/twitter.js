import axios from "axios";
import { saveMention } from "./saveMention.js";

export const fetchTwitterMentions = async (brand) => {
    const sample = `People talking about ${brand} on Twitter`;

    return saveMention({
        brand,
        text: sample,
        source: "X",
        url: "https://x.com",
    });
}