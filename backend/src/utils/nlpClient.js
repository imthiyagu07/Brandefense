import axios from "axios";

const NLP_URL = process.env.NLP_URL || "http://localhost:8001";

export const analyzeSentiment = async (text) => {
    try {
        const res = await axios.post(`${NLP_URL}/sentiment`, {text});
        return res.data.sentiment;
    } catch (err) {
        if (err.response) {
        console.error("Sentiment API Response:", err.response.status, err.response.data);
        } else if (err.request) {
        console.error("Sentiment API No Response — service unreachable");
        } else {
        console.error("Sentiment API Setup Error:", err.message);
        }
        return "neutral";
    }
};

export const generateEmbedding = async (text) => {
    try {
        const res = await axios.post(`${NLP_URL}/embed`, {text});
        return res.data.embedding;
    } catch (err) {
        if (err.response) {
        console.error("Embedding API Response:", err.response.status, err.response.data);
        } else if (err.request) {
        console.error("Embedding API No Response — service unreachable");
        } else {
        console.error("Embedding API Setup Error:", err.message);
        }
        return [];
    }
};