import express from "express";
import { userRouter } from "../routes/user-router";
import errorMiddleware from "../middleware/error-middleware";

export const app = express();

app.use(express.json());

app.use("/api/user", userRouter);

app.use(errorMiddleware);
