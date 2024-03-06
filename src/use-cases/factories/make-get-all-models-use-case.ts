import { ModelProvider } from "../../database/providers/models-provider";
import { GetAlLModelsUseCase } from "../get-all-models-use-case";

export const makeGetAllModelsUseCase = () => {
  return new GetAlLModelsUseCase(new ModelProvider());
};
