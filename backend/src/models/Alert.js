import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  brand: String,
  level: String, // low, medium, high
  description: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Alert", alertSchema);
