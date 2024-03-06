import { Request, Response } from "express";
import { authenticateSessionSchema } from "../schemas";
import { makeAuthenticateSessionUseCase } from "../use-cases/factories/make-authenticate-session-use-case";

export const authenticateSessionController = async (
  req: Request,
  res: Response
) => {
  const credentials = authenticateSessionSchema.parse(req?.body);

  const authenticateSessionUseCase = makeAuthenticateSessionUseCase();

  const { token, user } = await authenticateSessionUseCase.execute(credentials);

  return res.status(200).json({ token, user });
};
