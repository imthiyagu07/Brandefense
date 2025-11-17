import mongoose from "mongoose";

const mentionSchema = new mongoose.Schema({
    brand: String,
    text: String,
    source: String,
    url: String,
    sentiment: {type: String, enum: ["positive", "negative", "neutral"], default: "neutral"},
    topics: [String],
}, {timestamps: true});

export default mongoose.model("Mention", mentionSchema);