import { HttpStatusCode } from "@/config";
import { Router, Response } from "express";

export default (router: Router, prefix: string) => {

  router.get(`${prefix}/me`, (_, res: Response) => {
    res.status(HttpStatusCode.OK).json({ msg: "hello" });
  })
}
