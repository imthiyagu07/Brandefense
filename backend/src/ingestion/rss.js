import { saveMention } from "./saveMention.js";

export const fetchRSSMentions = async (brand) => {
  const sample = `${brand} mentioned in a tech blog`;

  return saveMention({
    brand,
    text: sample,
    source: "rss",
    url: "https://example.com",
  });
};
