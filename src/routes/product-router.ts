import { Router } from "express";
import { createProductController } from "../controllers/create-product-controller";
import { resolver } from "../middleware/resolver";
import { updateProductController } from "../controllers/update-product-controller";

export const productRouter = Router();

productRouter.post("/", resolver(createProductController));
productRouter.put("/", resolver(updateProductController));
