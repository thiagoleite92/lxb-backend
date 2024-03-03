/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrandRepository } from "../../src/repositories/brand-repository";
import { CreateBrandSchema } from "../../src/schemas";

export class InMemoryBrandProvider implements BrandRepository {
  public items: any[] = [];

  async create(createBrand: CreateBrandSchema) {
    this.items.push({
      brand: createBrand.brand,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: Math.floor(Math.random() * 10000),
    });
  }

  async findByName(name: string) {
    const brand = this.items.find((item) => item.brand === name);

    if (brand) {
      return brand;
    } else {
      return null;
    }
  }

  async findById(id: number) {
    const brand = this.items.find((item) => item.id === id);

    if (!brand) {
      return null;
    } else {
      return brand;
    }
  }
}
