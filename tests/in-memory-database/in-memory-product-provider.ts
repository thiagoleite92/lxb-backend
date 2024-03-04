/* eslint-disable @typescript-eslint/no-explicit-any */
import { Products } from "../../src/database/entities/products-entity";
import {
  CreateProduct,
  ProductRepository,
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
        item.modelId === modelId
    );

    if (find) {
      return find;
    } else {
      return null;
    }
  }
}
