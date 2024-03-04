import { BrandProvider } from "../../database/providers/brand-provider";
import { ColorProvider } from "../../database/providers/color-provider";
import { ModelProvider } from "../../database/providers/models-provider";
import { ProductProvider } from "../../database/providers/product-provider";
import { UpdateProductUseCase } from "../update-product-use-case";

export const makeUpdateProductUseCase = () => {
  return new UpdateProductUseCase(
    new ProductProvider(),
    new ColorProvider(),
    new ModelProvider(),
    new BrandProvider()
  );
};
