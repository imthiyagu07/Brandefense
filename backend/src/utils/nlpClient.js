import axios from "axios";

const NLP_URL = process.env.NLP_URL || "http://localhost:8001";

export const analyzeSentiment = async (text) => {
    try {
        const res = await axios.get(`${NLP_URL}/sentiment`, {text});
        return res.data.sentiment;
    } catch (error) {
        console.error("Sentiment API error:", error.message);
        return "neutral";
    }
};

export const generateEmbedding = async (text) => {
    try {
        const res = await axios.post(`${NLP_URL}/embed`, {text});
        return res.data.embedding;
    } catch (error) {
        console.error("Embedding API error:", error.message);
        return [];
    }
};