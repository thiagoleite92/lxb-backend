import { Router } from "express";
import { resolver } from "../middleware/resolver";
import { authenticateSessionController } from "../controllers";

export const authenticateRouter = Router();

authenticateRouter.post("/session", resolver(authenticateSessionController));
