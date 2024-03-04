import { Request, Response } from "express";
import { updateProductSchema } from "../schemas";
import { makeUpdateProductUseCase } from "../use-cases/factories/make-update-product-use-case";

export const updateProductController = async (req: Request, res: Response) => {
  const body = updateProductSchema.parse(req.body);

  const updateProductUseCase = makeUpdateProductUseCase();

  await updateProductUseCase.execute(body);

  return res.status(200).json({ message: "ok" });
};
