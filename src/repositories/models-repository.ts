import { Models } from "../database/entities/models-entity";

export interface ModelRepository {
  create(dto: { model: string; brandId: number }): Promise<void>;
  findOrCreate(model: string, brandId: number): Promise<[Models, boolean]>;
}
