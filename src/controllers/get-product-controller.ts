import { Request, Response } from "express";
import { updateProductSchemaParams } from "../schemas";
import { makeGetProductUseCase } from "../use-cases/factories/make-get-user-product-use-case";

export const getProductController = async (req: Request, res: Response) => {
  const { productId } = updateProductSchemaParams.parse(req.params);

  console.log(productId);

  const getProductUseCase = makeGetProductUseCase();

  const product = await getProductUseCase.execute(productId);

  return res.status(200).json({ product });
};
