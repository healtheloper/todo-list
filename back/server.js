import { join, dirname } from "path";
import { getDate } from "./utils.js";
import jsonServer from "json-server";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import { LOG_TYPE, TABLE_NAME } from "./constants.js";
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const __dirname = dirname(fileURLToPath(import.meta.url));

const adapter = new JSONFile(join(__dirname, "db.json"));
const db = new Low(adapter);

const PORT = process.env.PORT || 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

/**
 * todo logs controllers
 */
const getTodoLogs = async () => {
  try {
    await db.read();
    const todoLogs = db.data[TABLE_NAME.TODO_LOGS];
    if (!todoLogs) {
      throw Error("DB에 Todo 로그 테이블이 없습니다.");
    }
    return {
      ok: true,
      results: todoLogs,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

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
/**
 * todo controllers
 */
const getTodos = async () => {
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

const getTodoById = async ({ id }) => {
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

const postTodoCreate = async ({
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

const deleteTodoById = async ({ id, isloggable = true }) => {
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

const patchTodoById = async ({ id, updatedData }) => {
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

/**
 * todo logs routes
 */
server.get("/todo/logs", async (req, res) => {
  const sendData = await getTodoLogs();
  res.send(sendData);
});
/**
 * todo routes
 */
server.post("/todo/create", async (req, res) => {
  const { body } = req;
  const sendData = await postTodoCreate({ createData: body });
  res.send(sendData);
});

server.get("/todo", async (req, res) => {
  const sendData = await getTodos();
  res.send(sendData);
});

server.get("/todo/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
  const sendData = await getTodoById({ id });
  res.send(sendData);
});

server.delete("/todo/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
  const sendData = await deleteTodoById({ id });
  res.send(sendData);
});

server.patch("/todo/:id", async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  const sendData = await patchTodoById({ id, body });
  res.send(sendData);
});

server.use(router);

server.listen(PORT, () => {
  console.log(`✅ JSON server is listening on ${PORT}`);
});
