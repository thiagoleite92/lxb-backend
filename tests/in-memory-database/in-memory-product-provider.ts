/* eslint-disable @typescript-eslint/no-explicit-any */
import { Products } from "../../src/database/entities/products-entity";
import {
  CreateProduct,
  ProductRepository,
  UpdateProduct,
} from "../../src/repositories/product-repository";
import { CreateProductV1 } from "../../src/schemas";
import { InMemoryBrandProvider } from "./in-memory-brand-provider";
import { InMemoryColorProvider } from "./in-memory-color-provider";
import { InMemoryModelProvider } from "./in-memory-model-provider";

export class InMemoryProductProvider implements ProductRepository {
  public items: any[] = [];

  constructor(
    private readonly inMemoryColorProvider: InMemoryColorProvider,
    private readonly inMemoryBrandProvider: InMemoryBrandProvider,
    private readonly inMemoryModelProvider: InMemoryModelProvider
  ) {}

  async create(createProduct: CreateProduct) {
    this.items.push({
      ...createProduct,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: Math.floor(Math.random() * 10000),
    });
  }

  async findExistingProduct(
    findProduct: CreateProductV1
  ): Promise<Products | null> {
    const colorId = this.inMemoryColorProvider.items.find(
      ({ color }) => color === findProduct.color
    ).id;

    const brandId = this.inMemoryBrandProvider.items.find(
      ({ brand }) => brand === findProduct.brand
    ).id;

    const modelId = this.inMemoryModelProvider.items.find(
      ({ model }) => model === findProduct.model
    ).id;

    const find = this.items.find(
      (item) =>
        item.colorId === colorId &&
        item.brandId === brandId &&
        item.modelId === modelId &&
        item.name === findProduct.name &&
        item.price === findProduct.price
    );

    if (find) {
      return find;
    } else {
      return null;
    }
  }

  async findById(id: number) {
    const product = this.items.find((item) => item.id === id);

    if (!product) {
      return null;
    } else {
      return product;
    }
  }

  async update(updateProduct: UpdateProduct) {
    const product = this.items.find((item) => item.id === updateProduct.id);

    product.name = updateProduct?.name;
    product.price = updateProduct?.price;
    product.modelId = updateProduct?.modelId;
    product.colorId = updateProduct?.colorId;
    product.brandId = updateProduct?.brandId;

    return;
  }

  async delete(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
