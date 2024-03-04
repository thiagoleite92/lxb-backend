import { Products } from "../database/entities/products-entity";
import { CreateProductV1 } from "../schemas";

export type CreateProduct = {
  name: string;
  price: number;
  modelId: number;
  brandId: number;
  colorId: number;
};

export type UpdateProduct = {
  id: number;
  name: string;
  price: number;
  modelId: number;
  brandId: number;
  colorId: number;
};

export interface ProductRepository {
  create(createProduct: CreateProduct): Promise<void>;
  findExistingProduct({
    name,
    brand,
    color,
    model,
    price,
  }: CreateProductV1): Promise<Products | null>;
  findById(id: number): Promise<Products | null>;
  update(updateProduct: UpdateProduct): Promise<void>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Products[]>;
}
