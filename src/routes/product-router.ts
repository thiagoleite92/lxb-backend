import { Router } from "express";
import { createProductController } from "../controllers/create-product-controller";
import { resolver } from "../middleware/resolver";

export const productRouter = Router();

productRouter.post("/", resolver(createProductController));
