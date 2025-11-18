import mongoose from "mongoose";

const mentionSchema = new mongoose.Schema({
    brand: String,
    text: String,
    source: String,
    url: String,
    sentiment: {type: String, enum: ["positive", "negative", "neutral"], default: "neutral"},
    topics: [String],
    embedding: {type: [Number], default: []}
}, {timestamps: true});

export default mongoose.model("Mention", mentionSchema);