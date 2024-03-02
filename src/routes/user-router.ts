import { Router } from "express";
import { userRegisterController } from "../controllers";
import { resolver } from "../middleware/resolver";

export const userRouter = Router();

userRouter.post("/", resolver(userRegisterController));
