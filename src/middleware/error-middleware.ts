import { ZodError } from "zod";
import { ConflictError } from "../use-cases/errors/conflict-error";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export default function errorMiddleware(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({ issues: err.format() });
  }

  if (err instanceof ConflictError) {
    return res.status(409).json({ message: err.message });
  }

  return res.status(500).json({ message: "Something went wrong" });
}
