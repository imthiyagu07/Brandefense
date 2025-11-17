import axios from "axios";
import { saveMention } from "./saveMention.js";

export const fetchNewsMentions = async (brand) => {
  const sample = `${brand} featured in a news article`;

  return saveMention({
    brand,
    text: sample,
    source: "news",
    url: "https://news.com",
  });
};
