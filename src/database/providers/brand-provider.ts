import { BrandRepository } from "../../repositories/brand-repository";
import { CreateBrandSchema } from "../../schemas";
import { Brands } from "../entities/brands-entity";

export class BrandProvider implements BrandRepository {
  async findById(id: number) {
    return Brands.findByPk(id);
  }
  async create(createBrand: CreateBrandSchema): Promise<void> {
    await Brands.create(createBrand);
  }
  async findByName(name: string): Promise<Brands | null> {
    return Brands.findOne({ where: { brand: name } });
  }

  async findOrCreate(brand: string) {
    return Brands.findOrCreate({ where: { brand }, defaults: { brand } });
  }
}
