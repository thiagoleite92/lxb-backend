import { Router } from "express";
import { registerUser } from "../../controllers";

export const userRouter = Router();

userRouter.post("/", registerUser);
