import { ResourceNotFoundError } from "../errors/ApiErrors";
import { ProductRepository } from "../repositories/product-repository";

export class GetProductUseCase {
  constructor(private readonly productProvider: ProductRepository) {}

  async execute(productId: number) {
    const product = await this.productProvider.findById(productId);

    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }

    return product;
  }
}
