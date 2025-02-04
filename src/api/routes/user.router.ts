import { Router, Response } from "express";

export default (router: Router, prefix: string) => {

  router.get(`${prefix}/me`, (_, res: Response) => {
    res.status(200).json({ msg: "hello" });
  })
}
