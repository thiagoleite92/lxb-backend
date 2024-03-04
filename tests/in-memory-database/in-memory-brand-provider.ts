/* eslint-disable @typescript-eslint/no-explicit-any */
import { Brands } from "../../src/database/entities/brands-entity";
import { BrandRepository } from "../../src/repositories/brand-repository";

export class InMemoryBrandProvider implements BrandRepository {
  public items: any[] = [];

  async create(brand: string) {
    this.items.push({
      brand,
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

  async findOrCreate(brand: string): Promise<[Brands, boolean]> {
    const existingBrand = await this.findByName(brand);

    if (existingBrand) {
      return [existingBrand, false];
    } else {
      const newBrand = await this.create(brand);

      return [newBrand!, true];
    }
  }
}
