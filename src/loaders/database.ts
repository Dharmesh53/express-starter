import mongoose from "mongoose";
import { config } from "@/config";
import { Logger } from "./logger";

export default async function() {
  try {
    const connectionInstance = await mongoose.connect(config.databaseUrl);
    return connectionInstance.connection
  } catch (error) {
    Logger.error("Error while connecting to DB:", error);
    process.exit(1)
  }
}
