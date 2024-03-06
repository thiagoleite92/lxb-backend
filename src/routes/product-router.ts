import { Router } from "express";
import { createProductController } from "../controllers/create-product-controller";
import { resolver } from "../middleware/resolver";
import { updateProductController } from "../controllers/update-product-controller";
import { deleteProductController } from "../controllers/delete-product-controller";
import { authenticateMiddleware } from "../middleware/authenticate-middleware";
import { getProductController } from "../controllers/get-product-controller";
import { findAllProductsController } from "../controllers/find-all-products-controller";
import { getAllBrandsController } from "../controllers/get-all-brands-controller";

export const productRouter = Router();

productRouter.use(resolver(authenticateMiddleware));

productRouter.get("/", resolver(findAllProductsController));
productRouter.get("/brands", resolver(getAllBrandsController));
productRouter.get("/:productId", resolver(getProductController));
productRouter.post("/", resolver(createProductController));
productRouter.put("/:productId", resolver(updateProductController));
productRouter.delete("/:productId", resolver(deleteProductController));
