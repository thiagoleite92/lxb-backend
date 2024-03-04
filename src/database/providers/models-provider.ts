import { ModelRepository } from "../../repositories/models-repository";
import { Models } from "../entities/models-entity";

export class ModelProvider implements ModelRepository {
  async create(dto: { model: string; brandId: number }) {
    await Models.create(dto);
  }

  async findOrCreate(model: string, brandId: number) {
    return Models.findOrCreate({
      where: { model },
      defaults: { model, brandId },
    });
  }
}
