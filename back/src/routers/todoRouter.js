import express from "express";
import {
  getTodoById,
  getTodos,
  postTodoCreate,
  deleteTodoById,
} from "../controllers/todoController";

const todoRouter = express.Router();

todoRouter.get("/", getTodos);
todoRouter.get("/:id", getTodoById);
todoRouter.post("/create", postTodoCreate);
todoRouter.delete("/delete/:id", deleteTodoById);

export default todoRouter;
