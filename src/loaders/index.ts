import databaseLoader from "./database"
import expressLoader from "./express"
import { Logger } from "./logger"
import fs from 'fs'

export default async ({ expressApp }) => {
  await databaseLoader()
  Logger.info("~ Database Connected")

  const models = fs.readdirSync('./src/models/');
  models.forEach(async (model) => {
    await import(`../models/${model}`)
  })
  Logger.info("~ Models Synced")

  await expressLoader({ app: expressApp })
  Logger.info("~ Configured Express")
}
