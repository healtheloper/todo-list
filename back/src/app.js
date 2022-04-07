import bodyParser from "body-parser";
import express from "express";
import todoRouter from "./routers/todoRouter";
import columnRouter from "./routers/columnRouter";

const app = express();
app.use(bodyParser.json());
app.use("/todo", todoRouter);
app.use("/column", columnRouter);

export default app;
