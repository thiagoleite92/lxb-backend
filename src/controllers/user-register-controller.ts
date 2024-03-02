import { Request, Response } from "express";
import { registerUserSchema } from "../schemas";
import { UserRegisterUseCase } from "../use-cases/user-register-use-case";
import { UserProvider } from "../database/providers/user-provider";

export const userRegisterController = async (req: Request, res: Response) => {
  const user = registerUserSchema.parse(req?.body);

  const registerUserUseCase = new UserRegisterUseCase(new UserProvider());

  await registerUserUseCase.execute(user);

  return res.status(201).json({ message: "User created" });
};
