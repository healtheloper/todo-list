import { LOG_TYPE, TABLE_NAME } from "../common/constants.js";

const createTodoLogs = async ({ type, oldTodo, newTodo }) => {
  try {
    const lastIds = db.data[TABLE_NAME.LAST_ID];
    const lastIdObject = lastIds.find(
      ({ table }) => table === TABLE_NAME.TODO_LOGS
    );
    const { id: lastId } = lastIdObject;

    const createdAt = getDate();
    const logsData = { newTodo };
    if (type === LOG_TYPE.MOVE) {
      logsData.oldTodo = oldTodo;
    }
    const newTodoLogs = {
      id: lastId + 1,
      type,
      ...logsData,
      createdAt,
    };

    db.data[TABLE_NAME.TODO_LOGS].push(newTodoLogs);
    lastIdObject.id = lastId + 1;

    return {
      ok: true,
      results: newTodoLogs,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const getTodos = async () => {
  try {
    await db.read();
    const todos = db.data[TABLE_NAME.TODO];
    if (!todos) {
      throw Error("DB에 Todo 테이블이 없습니다.");
    }
    return {
      ok: true,
      results: todos,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const getTodoById = async ({ id }) => {
  try {
    const { results: todos } = await getTodos();
    const todo = todos.find((todo) => todo.id === Number(id));
    if (!todo) {
      throw Error("Todo 를 찾지 못했습니다.");
    }
    return {
      ok: true,
      results: todo,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const postTodoCreate = async ({
  createData: { title, desc, author, columnId },
}) => {
  try {
    await db.read();

    const lastIds = db.data[TABLE_NAME.LAST_ID];
    const lastIdObject = lastIds.find(({ table }) => table === TABLE_NAME.TODO);
    const { id: lastId } = lastIdObject;

    const createdAt = getDate();
    const updatedAt = createdAt;

    const newTodo = {
      id: lastId + 1,
      title,
      desc,
      author,
      columnId,
      createdAt,
      updatedAt,
    };

    db.data[TABLE_NAME.TODO].push(newTodo);
    lastIdObject.id = lastId + 1;

    await createTodoLogs({ type: "create", newTodo });
    await db.write();

    return {
      ok: true,
      results: newTodo,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const deleteTodoById = async ({ id, isloggable = true }) => {
  try {
    await db.read();

    const { ok, results: deletedTodo } = await getTodoById(id);

    if (!ok) {
      throw Error("해당하는 ID의 Todo 가 없습니다.");
    }
    const { results: todos } = await getTodos();
    const newTodo = todos.filter((todo) => todo.id !== +id);
    db.data[TABLE_NAME.TODO] = newTodo;

    if (isloggable) {
      await createTodoLogs({ type: "delete", newTodo: deletedTodo });
    }
    await db.write();

    return {
      ok: true,
      results: newTodo,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const patchTodoById = async ({ id, updatedData }) => {
  try {
    await db.read();

    const {
      ok: isTodoGet,
      message: messageGetError,
      results: todo,
    } = await getTodoById(id);
    if (!isTodoGet) {
      throw Error(`Todo 를 수정 중 에러가 발생했습니다. (${messageGetError})`);
    }
    const { ok: isTodoDeleted, message: messageDeleteError } =
      await deleteTodoById({
        id,
        isloggable: false,
      });
    if (!isTodoDeleted) {
      throw Error(
        `Todo 를 수정 중 에러가 발생했습니다. (${messageDeleteError})`
      );
    }
    const updatedAt = getDate();

    const newTodo = {
      ...todo,
      updatedAt,
      ...updatedData,
    };

    db.data[TABLE_NAME.TODO].push(newTodo);

    if (updatedData.columnId) {
      await createTodoLogs({ type: "move", oldTodo: todo, newTodo });
    } else {
      await createTodoLogs({ type: "update", newTodo });
    }

    await db.write();

    return {
      ok: true,
      results: newTodo,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
