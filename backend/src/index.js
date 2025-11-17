import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import Mention from "./models/Mention.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

app.get("/", (req, res) => {
    res.json({message: "Brand Tracker API Running"});
});

app.get("/test-insert", async (req, res) => {
  const doc = await Mention.create({
    brand: "Apple",
    text: "iPhone battery issue trending on Twitter",
    source: "twitter",
    timestamp: new Date(),
  });

  res.json(doc);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port:", PORT))