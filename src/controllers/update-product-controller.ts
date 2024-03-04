import { Request, Response } from "express";
import { updateProductSchema, updateProductSchemaParams } from "../schemas";
import { makeUpdateProductUseCase } from "../use-cases/factories/make-update-product-use-case";

export const updateProductController = async (req: Request, res: Response) => {
  const { productId } = updateProductSchemaParams.parse(req.params);
  const body = updateProductSchema.parse(req.body);

  const updateProductUseCase = makeUpdateProductUseCase();

  const updateProduct = {
    id: productId,
    ...body,
  };

  await updateProductUseCase.execute(updateProduct);

  return res.status(200).json({ message: "ok" });
};
