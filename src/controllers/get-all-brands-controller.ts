import { Request, Response } from "express";
import { makeGetAllBrandsUseCase } from "../use-cases/factories/makeGetAllBrandsUseCase";

export const getAllBrandsController = async (req: Request, res: Response) => {
  console.log(req);

  const getAllBrandsUseCase = makeGetAllBrandsUseCase();

  const brands = await getAllBrandsUseCase.execute();

  return res.status(200).json({ brands });
};
