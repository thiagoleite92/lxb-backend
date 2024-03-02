import { Handler, NextFunction, Request, Response, Router } from "express";
import { userRegisterController } from "../controllers";

const resolver =
  (handlerFn: Handler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(handlerFn(req, res, next)).catch(next);

export const userRouter = Router();

userRouter.post("/", resolver(userRegisterController));
