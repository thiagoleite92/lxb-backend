import { NextFunction, Request, Response } from "express";
import { JwtEncrypter } from "../cryptography/jwt/jwt";
import { UserProvider } from "../database/providers/user-provider";
import { BadRequestError } from "../errors/ApiErrors";

export const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwt = new JwtEncrypter(new UserProvider());

  const auth = req.headers.authorization;

  if (!auth) {
    throw new BadRequestError("Token Not Found");
  }

  const [bearer, token] = auth!.split(" ");

  if (bearer !== "Bearer") {
    throw new BadRequestError("Invalid Authentication");
  }

  req.user = await jwt.decode(token);

  next();
};
