import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({
  platform: String, // twitter, reddit
  apiKey: String,
  enabled: Boolean,
});

export default mongoose.model("Source", sourceSchema);
