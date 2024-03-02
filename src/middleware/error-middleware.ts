import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";

export default function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({ issues: err.format() });
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: "Something went wrong" });
}
