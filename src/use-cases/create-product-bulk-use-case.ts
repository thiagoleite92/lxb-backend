import { ConflictError } from "../errors/ApiErrors";
import { ProductRepository } from "../repositories/product-repository";
import { CreateProductV1 } from "../schemas";
import { makeCreateProductUseCase } from "./factories/make-create-product-use-case";

const createProductUseCase = makeCreateProductUseCase();
export class CreateProductBulkUseCase {
  constructor(private readonly productProvider: ProductRepository) {}

  async execute(createProduct: CreateProductV1[]) {
    const existingProducts = await Promise.all(
      createProduct.map(this.productProvider.findExistingProduct)
    );

    const newProducts = createProduct.filter(
      (_value, index) => existingProducts[index] === null
    );

    if (!newProducts?.length) {
      throw new ConflictError("All Products Already Exists");
    }

    for (const product of newProducts) {
      await createProductUseCase.execute(product);
    }
  }
}
