import { HttpStatusCode } from "@/config"

export class AppError extends Error {
  public readonly name: string
  public readonly statusCode: HttpStatusCode

  constructor(statusCode: HttpStatusCode, name: string, message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype) // ???, Go see the MDN Docs

    this.name = name;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor)
  }
}
