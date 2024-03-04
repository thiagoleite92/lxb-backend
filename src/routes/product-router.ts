import { Router } from "express";
import { createProductController } from "../controllers/create-product-controller";
import { resolver } from "../middleware/resolver";
import { updateProductController } from "../controllers/update-product-controller";
import { deleteProductController } from "../controllers/delete-product-controller";
import { authenticateMiddleware } from "../middleware/authenticate-middleware";

export const productRouter = Router();

productRouter.use(resolver(authenticateMiddleware));

productRouter.post("/", resolver(createProductController));
productRouter.put("/:productId", resolver(updateProductController));
productRouter.delete("/:productId", resolver(deleteProductController));
