import { ModelRepository } from "../repositories/models-repository";

export class GetAlLModelsUseCase {
  constructor(private readonly modelProvider: ModelRepository) {}

  async execute() {
    const models = await this.modelProvider.getAllModels();

    return models.map(parseModels);
  }
}

const parseModels = ({ model }: { model: string }) => ({
  value: model,
});
