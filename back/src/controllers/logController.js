import TodoLog from "../models/TodoLog";

import { dataTemplate } from "../common/utils";

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
