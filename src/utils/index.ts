import { HttpStatusCode } from "@/config";
import { AppError } from "@/errors/app-error";
import { Request, Response, NextFunction } from "express"

export const validateVersion = (allowedVersion: string) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const requestedVersion = req.path.split('/')[2];

    if (requestedVersion !== allowedVersion) {
      throw new AppError('Invalid Version', HttpStatusCode.BAD_REQUEST, `Only ${allowedVersion} is supported`, true)
    }

    next()
  }
}
