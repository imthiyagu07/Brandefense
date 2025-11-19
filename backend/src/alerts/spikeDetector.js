import cron from "node-cron";
import Mention from "../models/Mention.js";
import Alert from "../models/Alert.js";
import {io} from "../index.js";

export const startSpikeMonitor = () => {
    cron.schedule("*/2 * * * *", async () => {
        console.log("Running spike detection...");

        const brands = ["Apple"];

        for (let brand of brands) {
            const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
            const count = await Mention.countDocuments({
                brand,
            });

            console.log(`Brand: ${brand} | Last 1 min: ${count}`);

            if (count >= 10) {
                const alert = await Alert.create({
                    brand,
                    level: "high",
                    description: `Spike detected for ${brand}: ${count} mentions in 1 minute`,
                    createdAt: { $gte: oneMinuteAgo }
                });

                io.emit("new_alert", alert);

                console.log(`ALERT: Spike detected for ${brand}`);
            }
        }
    });
};