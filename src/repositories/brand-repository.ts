import { Brands } from "../database/entities/brands-entity";

export interface BrandRepository {
  create(brand: string): Promise<void>;
  findByName(name: string): Promise<Brands | null>;
  findById(id: number): Promise<Brands | null>;
  findOrCreate(brand: string): Promise<[Brands, boolean]>;
  getAllBrands(): Promise<Brands[]>;
}
