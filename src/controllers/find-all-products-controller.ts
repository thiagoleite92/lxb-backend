import { Request, Response } from "express";
import { makeFindAllProductsUseCase } from "../use-cases/factories/make-find-all-products-use-case";

export const findAllProductsController = async (
  req: Request,
  res: Response
) => {
  const findAllProductsUseCase = makeFindAllProductsUseCase();

  const products = await findAllProductsUseCase.execute();

  return res.status(200).json({ data: products });
};
