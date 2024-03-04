import { ProductRepository } from "../repositories/product-repository";

export class FindAllProductsUseCase {
  constructor(private readonly productProvider: ProductRepository) {}

  async execute() {
    return this.productProvider.findAll();
  }
}
