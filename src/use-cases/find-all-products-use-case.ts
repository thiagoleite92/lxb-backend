import { Products } from "../database/entities/products-entity";
import { ProductRepository } from "../repositories/product-repository";

export class FindAllProductsUseCase {
  constructor(private readonly productProvider: ProductRepository) {}

  async execute() {
    const products = await this.productProvider.findAll();
    return products.map(parseProducts);
  }
}

const parseProducts = (product: Products) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  color: product.color.color,
  brand: product.brand.brand,
  model: product.model.model,
});
