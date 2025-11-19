import Mention from "../models/Mention.js";
import { analyzeSentiment, generateEmbedding } from "../utils/nlpClient.js";

export const saveMention = async ({ brand, text, source, url }) => {
    try {
        const sentiment = await analyzeSentiment(text);
        const embedding = await generateEmbedding(text);

        if (!text || text.trim() === "") {
        console.warn("⚠ Skipping NLP: empty text received");
        return await Mention.create({
            brand,
            text: text || "",
            source,
            url,
            sentiment: "neutral",
            embedding: [],
        });
        }

        return await Mention.create({
            brand, 
            text, 
            source, 
            url,
            sentiment,
            embedding,
        });
    } catch (error) {
        console.error("Save mention failed:", error.message);
    }
};