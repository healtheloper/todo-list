import TodoLog from "../models/TodoLog";
import { getDate, sendMethodResult } from "../common/utils";

export const getTodoLog = sendMethodResult(async () => {
  const todos = await TodoLog.find();
  return todos;
});

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
