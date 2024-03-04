import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";

export default function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return res.status(400).json({ issues: error.format() });
  }

  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.log(error);

  return res.status(500).json({ message: "Something went wrong" });
}
