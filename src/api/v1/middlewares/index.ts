import { Logger } from "@/loaders/logger";
import { catchEmAll } from "@/lib/utils";
import { z } from "zod";

export function validate(schema: z.ZodSchema) {
  return catchEmAll((req, res, next) => {
    Logger.debug("Validating data...")
    schema.parse(req.body)
    next()
  })
}
