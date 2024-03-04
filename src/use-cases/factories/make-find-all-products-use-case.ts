import { ProductProvider } from "../../database/providers/product-provider";
import { FindAllProductsUseCase } from "../find-all-products-use-case";

export const makeFindAllProductsUseCase = () => {
  return new FindAllProductsUseCase(new ProductProvider());
};
