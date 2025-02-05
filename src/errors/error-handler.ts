import { CommanErrorsDict, HttpStatusCode } from "@/config"
import Logger from "@/loaders/logger"
import { NextFunction, Response, Request } from "express"
import { AppError } from "./app-error"

export class ErrorHandler {
  static handle(options = { showStack: true }) {
    return (error: AppError, _: Request, res: Response, next: NextFunction) => {
      if (options.showStack) {
        Logger.error(error.stack)
      } else {
        Logger.error(`${error.name}: ${error.message}`)
      }

      res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        ...(options.showStack && { stack: error.stack }),
      })
    }
  }

  static handle404(req: Request, res: Response, next: NextFunction) {
    next(new AppError('Not Found', HttpStatusCode.NOT_FOUND, CommanErrorsDict.resourceNotFound, true))
  }
}

