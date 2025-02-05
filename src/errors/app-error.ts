import { HttpStatusCode } from "@/config"

export class AppError extends Error {
  public readonly name: string
  public readonly statusCode: HttpStatusCode
  public readonly isOperational: boolean

  constructor(name: string, statusCode: HttpStatusCode, message: string, isOperational: boolean) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype) // ???, Go see the MDN Docs

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor)
  }
}
