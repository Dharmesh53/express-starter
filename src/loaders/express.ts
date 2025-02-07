import v1Routes from "@/api/v1"
import cors from "cors"
import helmet from "helmet";
import requestIp from "request-ip";
import express from "express"
import { config, corsConfig, Env, HttpStatusCode, limiter } from "@/config"
import { ErrorHandler } from "@/errors/error-handler";
import { validateVersion } from "@/config";
import { morganMiddleware } from "./logger";

export default async function({ app }: { app: express.Application }) {
  // Health check route
  app.head('/status', (_, res) => { res.status(HttpStatusCode.OK).end() })

  // Sets security-related http headers
  app.use(helmet())

  // Enable CORS with configuration
  app.use(cors(corsConfig))

  // Gets the request's IP for limiting the person's IP in next middleware
  app.use(requestIp.mw());

  // Rate Limiter allows 100 requests per 15 mintues
  app.use(limiter(100, 15 * 60 * 1000))

  // URL versioning
  app.use(validateVersion('v1'))

  // Logs incoming HTTP requests
  app.use(morganMiddleware)

  // Parses incoming JSON data
  app.use(express.json())

  // Parsing incoming URL-encoded form data
  app.use(express.urlencoded({ extended: true }));

  // Attaches API V1 routes
  app.use(config.api.v1Prefix, v1Routes())

  // Throws a 404 error if no matching route is found
  app.use(ErrorHandler.throw404)

  // Centralized error handler
  app.use(ErrorHandler.handle({ showStack: config.nodeEnv === Env.DEV }))
}
