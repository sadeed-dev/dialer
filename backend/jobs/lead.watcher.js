import cron from "node-cron";
import { checkRemainingLeadsAndNotify } from "../services/lead.service.js";

export const startLeadWatcherJob = () => {
  // ✅ Runs every 20 minutes
  cron.schedule("*/20 * * * *", async () => {
    console.log("⏰ Running cron: lead count check (every 20 minutes)");
    await checkRemainingLeadsAndNotify();
  });
};
