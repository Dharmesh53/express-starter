import express, { Application } from "express"
import config from "@/config"
import routes from "@/api"
import cors from "cors"
import helmet from "helmet";

export default async function({ app }: { app: Application }) {

  app.use(helmet())

  app.head('/status', (_, res) => {
    res.status(HttpStatusCode.OK).end();
  })

  app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'https://productionURL.com'
      ]

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error("Sorry bud, you are not allowed !!"))
      }
    },
    credentials: true,
    preflightContinue: false,
    maxAge: 600,
    optionsSuccessStatus: 204
  }))

  app.use(express.json())

  app.use(express.urlencoded({ extended: true }));

  app.use(config.api.prefix, routes())
}
