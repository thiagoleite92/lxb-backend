import { Request, Response } from "express";
import {
  CreateProductV1,
  createProductSchemaV1,
  createProductSchemaV2,
  createProductSchemaV3,
} from "../schemas";
import { BadRequestError } from "../errors/ApiErrors";
import { makeCreateProductUseCase } from "../use-cases/factories/make-create-product-use-case";
import { makeCreateProductBulkUseCase } from "../use-cases/factories/make-create-product-bulk-use-case";

export const createProductController = async (req: Request, res: Response) => {
  let product = null;

  const createProductUseCase = makeCreateProductUseCase();
  const createProductBulkUseCase = makeCreateProductBulkUseCase();

  const format1 = createProductSchemaV1.safeParse(req?.body);
  const format2 = createProductSchemaV2.safeParse(req?.body);
  const format3 = createProductSchemaV3.safeParse(req?.body);

  if (format1.success) {
    product = format1.data;
  }

  if (format2.success) {
    product = format2.data;
  }

  if (format3.success) {
    product = format3.data?.flat();
  }

  if (!format1.success && !format2.success && !format3.success) {
    throw new BadRequestError("Product Format Invalid");
  }

  if (format3.success) {
    await createProductBulkUseCase.execute(product as CreateProductV1[]);
    return res.status(201).json({ message: "ok" });
  } else {
    await createProductUseCase.execute(product as CreateProductV1);
    return res.status(201).json({ message: "ok" });
  }
};
