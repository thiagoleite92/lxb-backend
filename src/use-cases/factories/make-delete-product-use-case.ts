import { ProductProvider } from "../../database/providers/product-provider";
import { DeleteProductUseCase } from "../delete-product-use-case";

export const makeDeleteProductUseCase = () => {
  return new DeleteProductUseCase(new ProductProvider());
};
