import { Request, Response, NextFunction } from "express"
import Logger from "@/loaders/logger"
import { AppError } from "@/errors/app-error"
import { HttpStatusCode } from "@/config"

export const SignUpController = async (req: Request, res: Response, next: NextFunction) => {
  Logger.debug("Calling Sign-Up endpoint with body: %o", req.body)
  try {
    res.status(HttpStatusCode.CREATED).json({ data: "somedata" })
  } catch (error) {
    const errorMessage = error?.message ?? "An unexpected error occurred"
    next(new AppError('Forbidden', HttpStatusCode.INTERNAL_SERVER_ERROR, errorMessage, true));
  }
}

export const SignInController = async (req: Request, res: Response, next: NextFunction) => {
  Logger.debug("Calling Sign-In endpoint with body: %o", req.body)
  try {
    res.status(HttpStatusCode.OK).json({ data: "somedata" })
  } catch (error) {
    const errorMessage = error?.message ?? "An unexpected error occurred"
    next(new AppError('Forbidden', HttpStatusCode.INTERNAL_SERVER_ERROR, errorMessage, true));
  }
}
