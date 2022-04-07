import Todo from "../models/Todo";
import { getDate, dataTemplate } from "../common/utils";

export const getTodo = async (req, res) => {
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

export const postTodoCreate = async (req, res) => {
  try {
    const {
      body: { title, desc, author, columnId },
    } = req;
    const createdAt = getDate();
    const updatedAt = createdAt;
    const newTodo = await Todo.create({
      title,
      desc,
      author,
      columnId,
      createdAt,
      updatedAt,
    });
    res.send(dataTemplate(newTodo));
  } catch (error) {
    res.send({
      ok: false,
      message: error.message,
    });
  }
};
