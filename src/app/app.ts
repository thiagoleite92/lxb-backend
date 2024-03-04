import express from "express";
import errorMiddleware from "../middleware/error-middleware";
import { authenticateRouter, productRouter, userRouter } from "../routes";

export const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authenticateRouter);
app.use("/api/product", productRouter);

app.use(errorMiddleware);
