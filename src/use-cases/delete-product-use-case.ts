import { ResourceNotFoundError } from "../errors/ApiErrors";
import { ProductRepository } from "../repositories/product-repository";

export class DeleteProductUseCase {
  constructor(private readonly productProvider: ProductRepository) {}

  async execute(productId: number) {
    const existingProduct = await this.productProvider.findById(productId);

    if (!existingProduct) {
      throw new ResourceNotFoundError("Product not found");
    }

    await this.productProvider.delete(productId);
  }
}
