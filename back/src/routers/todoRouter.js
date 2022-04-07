import express from "express";
import {
  getTodoById,
  getTodos,
  postTodoCreate,
} from "../controllers/todoController";

const todoRouter = express.Router();

todoRouter.get("/", getTodos);
todoRouter.get("/:id", getTodoById);
todoRouter.post("/create", postTodoCreate);

export default todoRouter;
