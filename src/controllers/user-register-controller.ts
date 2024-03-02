import { Request, Response } from "express";
import { registerUserSchema } from "../schemas";
import { makeUserRegisterUseCase } from "../use-cases/factories/make-user-register-use-case";

export const userRegisterController = async (req: Request, res: Response) => {
  const user = registerUserSchema.parse(req?.body);

  const registerUserUseCase = makeUserRegisterUseCase();

  await registerUserUseCase.execute(user);

  return res.status(201).json({ message: "User created" });
};
