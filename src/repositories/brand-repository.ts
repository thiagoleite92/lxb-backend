import { Brand } from "../database/entities/brand-entity";

export interface BrandRepository {
  create(name: string): Promise<void>;
  findByName(name: string): Promise<Brand | null>;
}
