import { Request, Response } from "express";
import { makeGetAllModelsUseCase } from "../use-cases/factories/make-get-all-models-use-case";

export const getAllModelsController = async (req: Request, res: Response) => {
  console.log(req);

  const getAllModelsUseCase = makeGetAllModelsUseCase();

  const models = await getAllModelsUseCase.execute();

  return res.status(200).json({ data: models });
};
