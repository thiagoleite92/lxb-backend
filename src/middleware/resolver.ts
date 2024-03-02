import { Handler, NextFunction, Request, Response } from "express";

export const resolver = (handlerFn: Handler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handlerFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
