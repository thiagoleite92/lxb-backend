import { Request, Response } from "express";
import { updateProductSchemaParams } from "../schemas";
import { makeDeleteProductUseCase } from "../use-cases/factories/make-delete-product-use-case";

export const deleteProductController = async (req: Request, res: Response) => {
  const { productId } = updateProductSchemaParams.parse(req.params);

  const deleteProductUseCase = makeDeleteProductUseCase();

  await deleteProductUseCase.execute(productId);

  return res.status(200).json({ message: "ok" });
};
