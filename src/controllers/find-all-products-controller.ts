import { Request, Response } from "express";
import { makeFindAllProductsUseCase } from "../use-cases/factories/make-find-all-products-use-case";

export const findAllProductsController = async (
  req: Request,
  res: Response
) => {
  const findAllProductsUseCase = makeFindAllProductsUseCase();
  let query: any = "";
  if (req.query.search) {
    query = req.query.search;
  }

  const data = await findAllProductsUseCase.execute(query);

  return res.status(200).json({ data });
};
