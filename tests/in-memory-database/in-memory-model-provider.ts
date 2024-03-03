/* eslint-disable @typescript-eslint/no-explicit-any */
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
}
