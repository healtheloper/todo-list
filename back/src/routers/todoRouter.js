import express from "express";

import {
  getTodoById,
  getTodos,
  postTodoCreate,
  deleteTodoById,
  updateTodoById,
} from "../controllers/todoController";

const todoRouter = express.Router();

/**
 * @swagger
 *  /todo:
 *    get:
 *      summary: "Todo 리스트 검색"
 *      tags: [Todo]
 *      responses:
 *        "200":
 *          description: A Todo schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Todo'
 */
todoRouter.get("/", getTodos);

/**
 * @swagger
 *  /todo/:id:
 *    get:
 *      summary: 특정 Todo 검색
 *      tags: [Todo]
 *      responses:
 *        "200":
 *          description: A Todo schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Todo'
 */
todoRouter.get("/:id", getTodoById);

/**
 * @swagger
 *  /todo/create:
 *    post:
 *      summary: Todo 생성
 *      tags: [Todo]
 *      responses:
 *        "200":
 *          description: A Todo schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Todo'
 */
todoRouter.post("/create", postTodoCreate);

/**
 * @swagger
 * path:
 *  /todo/delete/:id:
 *    delete:
 *      summary: Todo 삭제
 *      tags: [Todo]
 *      responses:
 *        "200":
 *          description: A Todo schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Todo'
 */
todoRouter.delete("/delete/:id", deleteTodoById);

/**
 * @swagger
 * path:
 *  /todo/update/:id:
 *    patch:
 *      summary: Todo 수정
 *      tags: [Todo]
 *      responses:
 *        "200":
 *          description: A Todo schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Todo'
 */
todoRouter.patch("/update/:id", updateTodoById);

export default todoRouter;
