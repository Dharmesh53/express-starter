import { Logger } from "@/loaders/logger"

process.on("uncaughtException", (error: Error) => {
  Logger.error('Uncaught Exception: ', error.message)
  Logger.error(error.stack)
  process.exit(1)
})

process.on("unhandledRejection", (reason: unknown, promise: Promise<unknown>) => {
  Logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  process.exit(1)
})
