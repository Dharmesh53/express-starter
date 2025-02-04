import UserModel from "@/models/user"
import databaseLoader from "./database"
import dependencyInjector from "./dependencyInjector"
import expressLoader from "./express"
import Logger from "./logger"

export default async ({ expressApp }) => {
  const databaseConnection = await databaseLoader()
  Logger.info("~ Database Connected")

  dependencyInjector({ databaseConnection, models: [UserModel] })

  await expressLoader({ app: expressApp })
  Logger.info("~ Configured Express")
}
