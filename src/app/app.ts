import express from "express";
import errorMiddleware from "../middleware/error-middleware";
import { userRouter } from "../routes";

export const app = express();

app.use(express.json());

app.use("/api/user", userRouter);

app.use(errorMiddleware);
