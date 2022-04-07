import express from "express";
import todoRouter from "./routers/todoRouter";

const app = express();

app.use("/todo", todoRouter);

export default app;
