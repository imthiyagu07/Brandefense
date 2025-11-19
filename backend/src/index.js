import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io"

import { connectDB } from "./config/db.js";
import Mention from "./models/Mention.js";
import ingestionRoutes from "./routes/ingestion.js";
import { startSpikeMonitor } from "./alerts/spikeDetector.js";
import alertRoutes from "./routes/alerts.js";
import mentionRoutes from "./routes/mentions.js";
import trendsRoutes from "./routes/trends.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/ingest", ingestionRoutes);
app.use("/alerts", alertRoutes);
app.use("/mentions", mentionRoutes);
app.use("/trends", trendsRoutes);

const server = createServer(app);

// connect DB
connectDB();

// startSpikeMonitor();

export const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

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
server.listen(PORT, () => console.log("Server running on port:", PORT))