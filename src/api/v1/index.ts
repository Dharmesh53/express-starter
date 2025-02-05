import { Router } from "express";
import userRouter from "./routes/user.router"
import authRouter from "./routes/auth.router"

export default function() {
  const router = Router();

  userRouter(router, "/users")
  authRouter(router, "/auth")

  return router;
}
