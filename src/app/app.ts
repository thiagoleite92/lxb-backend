import express from "express";
import { userRouter } from "../routes";

export const app = express();

app.use(express.json());

app.use("/api/user", userRouter);

app.route("/");
