import { BrandRepository } from "../../repositories/brand-repository";
import { Brand } from "../entities/brand-entity";

export class BrandProvider implements BrandRepository {
  async create(name: string): Promise<void> {
    await Brand.create({ brand: name });
  }
  findByName(name: string): Promise<Brand | null> {
    return Brand.findOne({ where: { brand: name } });
  }
}
