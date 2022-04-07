import TodoLog from "../models/TodoLog";
import { dataTemplate, getDate } from "../common/utils";

export const getTodoLog = async (req, res) => {
  try {
    const todos = await TodoLog.find();
    res.send(dataTemplate(todos));
  } catch (error) {
    res.send({
      ok: false,
      message: error.message,
    });
  }
};

export const createTodoLog = async ({ type, logData }) => {
  try {
    const createdAt = getDate();
    const { _id, updatedAt, ...data } = logData.toObject();
    const newTodoLog = await TodoLog.create({
      ...data,
      todoId: _id,
      type,
      createdAt,
    });
    return {
      ok: true,
      results: newTodoLog,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
