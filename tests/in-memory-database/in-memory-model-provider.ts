/* eslint-disable @typescript-eslint/no-explicit-any */
import { Models } from "../../src/database/entities/models-entity";
import { ModelRepository } from "../../src/repositories/models-repository";
import { CreateModelSchema } from "../../src/schemas";

export class InMemoryModelProvider implements ModelRepository {
  public items: any[] = [];

  async create(createModel: CreateModelSchema) {
    this.items.push({
      model: createModel.model,
      brandId: createModel.brandId,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: Math.floor(Math.random() * 10000),
    });
  }
  async findByName(model: string) {
    const existingModel = this.items.find((item) => item.model === model);

    if (!existingModel) {
      return null;
    } else {
      return existingModel;
    }
  }

  async findOrCreate(
    model: string,
    brandId: number
  ): Promise<[Models, boolean]> {
    const existingModel = await this.findByName(model);

    if (existingModel) {
      return [existingModel, false];
    } else {
      const newModel = await this.create({ model, brandId });

      return [newModel!, true];
    }
  }
}
