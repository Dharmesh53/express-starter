import { Router } from "express";
import { SignInController, SignUpController } from "../controllers/auth.controller";

export default (router: Router, prefix: string) => {
  router.post(`${prefix}/signup`, SignUpController)
  router.post(`${prefix}/signin`, SignInController)
}
