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
