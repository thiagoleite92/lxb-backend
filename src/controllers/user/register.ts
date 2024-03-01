import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  res.status(201).json(req.body);
};
