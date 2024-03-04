import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(3, "Min 3 chars"),
  email: z.string().email(),
  password: z.string().min(6, "Min 6 chars").max(12, "Max 12 chars"),
});

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;

export const authenticateSessionSchema = z.object({
  login: z.string().email(),
  password: z.string().min(3),
});

export type AuthenticateSessionSchema = z.infer<
  typeof authenticateSessionSchema
>;

export const createBrandSchema = z.object({
  brand: z.string().min(3).max(50),
});

export type CreateBrandSchema = z.infer<typeof createBrandSchema>;

export const createModelSchema = z.object({
  model: z.string().min(3).max(50),
  brandId: z.number(),
});

export type CreateModelSchema = z.infer<typeof createModelSchema>;

export const createProductSchemaV1 = z.object({
  name: z.string().min(3).max(50),
  price: z.number(),
  color: z.string().min(3).max(50),
  brand: z.string().min(3).max(50),
  model: z.string().min(3).max(50),
});

export type CreateProductV1 = z.infer<typeof createProductSchemaV1>;

export const createProductSchemaV2 = z
  .object({
    name: z.string().min(3).max(50),
    details: z.object({
      brand: z.string().min(3).max(50),
      model: z.string().min(3).max(50),
      color: z.string().min(3).max(50),
    }),
    price: z.number(),
  })
  .transform(({ name, price, details: { brand, color, model } }) => ({
    name,
    price,
    color,
    brand,
    model,
  }));

export type CreateProductV2 = z.infer<typeof createProductSchemaV2>;

export const createProductSchemaV3 = z.array(
  z
    .object({
      name: z.string().min(3).max(50),
      brand: z.string().min(3).max(50),
      model: z.string().min(3).max(50),
      data: z.array(
        z.object({
          price: z.number().min(3).max(50),
          color: z.string().min(3).max(50),
        })
      ),
    })
    .transform((value) => {
      const products = value?.data.map((details) => ({
        name: value.name,
        brand: value.brand,
        model: value.model,
        price: details.price,
        color: details.color,
      }));

      return products;
    })
);

export type CreateProductV3 = z.infer<typeof createProductSchemaV3>;

export const updateProductSchema = z.object({
  name: z.string().min(3).max(50),
  price: z.number(),
  color: z.string().min(3).max(50),
  brand: z.string().min(3).max(50),
  model: z.string().min(3).max(50),
});

export const updateProductSchemaParams = z.object({
  productId: z.coerce.number(),
});

export type UpdateProduct = z.infer<typeof updateProductSchema>;
