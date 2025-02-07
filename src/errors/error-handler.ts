import { CommanErrorsDict, HttpStatusCode } from "@/config"
import { Logger } from "@/loaders/logger"
import { NextFunction, Response, Request } from "express"
import { AppError } from "./app-error"
import mongoose from "mongoose"

export class ErrorHandler {
  static handle(options = { showStack: true }) {
    return (err: Error, req: Request, res: Response, _: NextFunction) => {
      let error = err;

      if (!(error instanceof AppError)) {
        const statusCode = error instanceof mongoose.Error ? HttpStatusCode.BAD_REQUEST : HttpStatusCode.INTERNAL_SERVER_ERROR
        error = new AppError(statusCode, "This is messed up, brother.", `It is a unexpected one, ${error.message}!!`)
      }

      if (options.showStack) {
        Logger.error(error.stack)
      } else {
        Logger.error(`${error.name}: ${error.message}`)
      }

      // you can send mail to admin to error severity is high

      const response = {
        success: false,
        error: error.name,
        message: error.message,
        ...(options.showStack && { stack: error.stack }),
      }

      res.status((error as AppError).statusCode).json(response)
    }
  }

  static throw404(_: Request, __: Response, next: NextFunction) {
    next(new AppError(HttpStatusCode.NOT_FOUND, 'Not Found', CommanErrorsDict.routeNotFound))
  }
}

