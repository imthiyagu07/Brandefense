import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import Mention from "./models/Mention.js";
import ingestionRoutes from "./routes/ingestion.js";
import { startSpikeMonitor } from "./alerts/spikeDetector.js";
import alertRoutes from "./routes/alerts.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/ingest", ingestionRoutes);
app.use("/alerts", alertRoutes);

// connect DB
connectDB();

// startSpikeMonitor();

app.get("/", (req, res) => {
    res.json({message: "Brand Tracker API Running"});
});

app.get("/test-db", async (req, res) => {
  try {
    const doc = await Mention.create({
      brand: "Test Apple",
      text: "Testing DB insert",
      source: "test",
      url: "https://test.com",
      timestamp: new Date(),
    });

    res.json(doc);
  } catch (err) {
    res.json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port:", PORT))