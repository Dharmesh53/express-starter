import v1Routes from "@/api/v1"
import cors from "cors"
import helmet from "helmet";
import express from "express"
import { config, corsConfig, Env, HttpStatusCode } from "@/config"
import { ErrorHandler } from "@/errors/error-handler";
import { validateVersion } from "@/utils";
import { morganMiddleware } from "./logger";

export default async function({ app }: { app: express.Application }) {
  app.use(helmet())

  app.head('/status', (_, res) => { res.status(HttpStatusCode.OK).end() })

  app.use(cors(corsConfig))

  app.use(validateVersion('v1'))

  app.use(morganMiddleware)

  app.use(express.json())

  app.use(express.urlencoded({ extended: true }));

  app.use(config.api.v1Prefix, v1Routes())

  app.use(ErrorHandler.handle404)

  app.use(ErrorHandler.handle({ showStack: config.nodeEnv === Env.DEV }))

}
