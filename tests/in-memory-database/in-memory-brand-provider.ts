import { BrandProvider } from "../../src/database/providers/brand-provider";

export class InMemoryBrandProvider implements BrandProvider {
  public items: any[] = [];

  async create(name: string): Promise<void> {
    this.items.push({
      brand: name,
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
}
