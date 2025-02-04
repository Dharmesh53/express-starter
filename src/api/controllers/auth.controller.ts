import { Request, Response, NextFunction } from "express"
import Container from "typedi"
import { Logger } from "winston"

export const SignUpController = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = Container.get('logger')
  logger.debug("Calling Sign-Up endpoint with body: %o", req.body)

  try {
    res.status(HttpStatusCode.CREATED).json({ data: "somedata" })
  } catch (error) {
    logger.error('error: %o', error);
    next(error)
  }
}

export const SignInController = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = Container.get('logger')
  logger.debug("Calling Sign-In endpoint with body: %o", req.body)

  try {
    res.status(HttpStatusCode.OK).json({ data: "somedata" })
  } catch (error) {
    logger.error('error: %o', error);
    next(error)
  }
}
