import { BrandProvider } from "../../database/providers/brand-provider";
import { ColorProvider } from "../../database/providers/color-provider";
import { ModelProvider } from "../../database/providers/models-provider";
import { ProductProvider } from "../../database/providers/product-provider";
import { CreateProductUseCase } from "../create-product-use-case";

export const makeCreateProductUseCase = () => {
  return new CreateProductUseCase(
    new ProductProvider(),
    new ColorProvider(),
    new ModelProvider(),
    new BrandProvider()
  );
};
