import express, { Application } from "express"
import { config, Env, HttpStatusCode } from "@/config"
import routes from "@/api"
import cors from "cors"
import helmet from "helmet";
import { ErrorHandler } from "@/errors/error-handler";

export default async function({ app }: { app: Application }) {
  app.use(helmet())

  app.head('/status', (_, res) => {
    res.status(HttpStatusCode.OK).end();
  })

  app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = [...config.origins]

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error("Sorry bud, you are not allowed !!"))
      }
    },
    credentials: true,
    preflightContinue: false,
    maxAge: 600,
  }))

  app.use(express.json())

  app.use(express.urlencoded({ extended: true }));

  app.use(config.api.prefix, routes())

  app.use(ErrorHandler.handle404)

  app.use(ErrorHandler.handle({ showStack: config.nodeEnv === Env.DEV }))
}
