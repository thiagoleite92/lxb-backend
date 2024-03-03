import { Models } from "../database/entities/models-entity";

export interface ModelRepository {
  create(dto: { model: string; brandId: number }): Promise<void>;
  findByName(Model: string): Promise<Models | null>;
}
