import Todo from "../models/Todo";
import TodoLog from "../models/TodoLog";

import { getDate, dataTemplate } from "../common/utils";
import { LOG_TYPE } from "../common/constants";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(dataTemplate(todos));
  } catch (error) {
    res.send({
      ok: false,
      message: error.message,
    });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const todo = await Todo.findById(id);
    res.send(dataTemplate(todo));
  } catch (error) {
    res.send({
      ok: false,
      message: error.message,
    });
  }
};

export const postTodoCreate = async (req, res) => {
  try {
    const {
      body: { title, desc, author, columnId },
    } = req;
    const createdAt = getDate();
    const updatedAt = createdAt;
    const newTodoData = {
      title,
      desc,
      author,
      columnId,
      createdAt,
      updatedAt,
    };
    const newTodo = await Todo.create(newTodoData);

    await TodoLog.create({
      ...newTodoData,
      type: LOG_TYPE.CREATE,
    });

    res.send(dataTemplate(newTodo));
  } catch (error) {
    res.send({
      ok: false,
      message: error.message,
    });
  }
};

export const deleteTodoById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const deletedTodo = await Todo.findByIdAndRemove(id);
    res.send(dataTemplate(deletedTodo));
  } catch (error) {
    res.send({
      ok: false,
      error: error.message,
    });
  }
};

export const updateTodoById = async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const isTodoExist = await Todo.exists({ _id: id });
    if (!isTodoExist) {
      throw Error("해당 Todo 가 없습니다.");
    }
    const updatedTodo = await Todo.findByIdAndUpdate(id, body);
    res.send(dataTemplate(updatedTodo));
  } catch (error) {
    res.send({
      ok: false,
      error: error.message,
    });
  }
};
