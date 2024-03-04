import { Products } from "../database/entities/products-entity";
import { CreateProductV1 } from "../schemas";

export type CreateProduct = {
  name: string;
  price: number;
  modelId: number;
  brandId: number;
  colorId: number;
};

export interface ProductRepository {
  create(createProduct: CreateProduct): Promise<void>;
  createBulk(createProduct: CreateProduct[]): Promise<void>;
  findExistingProduct({
    name,
    brand,
    color,
    model,
    price,
  }: CreateProductV1): Promise<Products | null>;
}
