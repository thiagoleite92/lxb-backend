import { BrandProvider } from "../../database/providers/brand-provider";
import { ColorProvider } from "../../database/providers/color-provider";
import { ModelProvider } from "../../database/providers/models-provider";
import { ProductProvider } from "../../database/providers/product-provider";
import { CreateProductBulkUseCase } from "../create-product-bulk-use-case";

export const makeCreateProductBulkUseCase = () => {
  return new CreateProductBulkUseCase(
    new ProductProvider(),
    new ColorProvider(),
    new ModelProvider(),
    new BrandProvider()
  );
};
