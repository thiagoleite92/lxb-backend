import { ProductProvider } from "../../database/providers/product-provider";
import { GetProductUseCase } from "../get-product-use-case";

export const makeGetProductUseCase = () => {
  return new GetProductUseCase(new ProductProvider());
};
