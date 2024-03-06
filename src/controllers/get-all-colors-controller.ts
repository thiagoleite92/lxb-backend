import { Request, Response } from "express";
import { makeGetAllColorsUseCase } from "../use-cases/factories/make-get-all-colors-use-case";

export const getAllColorsController = async (req: Request, res: Response) => {
  console.log(req);

  const getAllColorsUseCase = makeGetAllColorsUseCase();

  const colors = await getAllColorsUseCase.execute();

  return res.status(200).json({ data: colors });
};
