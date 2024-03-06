import express from "express";
import cors from "cors";
import errorMiddleware from "../middleware/error-middleware";
import { authenticateRouter, productRouter, userRouter } from "../routes";

export const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authenticateRouter);
app.use("/api/product", productRouter);

app.use(errorMiddleware);
