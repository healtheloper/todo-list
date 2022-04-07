import express from "express";
import { getTodo, postTodoCreate } from "../controllers/todoController";

const todoRouter = express.Router();

todoRouter.get("/", getTodo);
todoRouter.post("/create", postTodoCreate);

export default todoRouter;
