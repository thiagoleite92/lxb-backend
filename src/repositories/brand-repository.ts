import { Brands } from "../database/entities/brands-entity";
import { CreateBrandSchema } from "../schemas";

export interface BrandRepository {
  create(createBrand: CreateBrandSchema): Promise<void>;
  findByName(name: string): Promise<Brands | null>;
  findById(id: number): Promise<Brands | null>;
}
