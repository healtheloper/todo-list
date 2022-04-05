import { join, dirname } from "path";
import { getDate } from "./utils.js";
import jsonServer from "json-server";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

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
 * todo controllers
 */
const getTodos = async () => {
  try {
    await db.read();
    const todos = db.data.todo;
    if (!todos) {
      throw Error("Todo 리스트를 찾지 못했습니다.");
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

const getTodoById = async (id) => {
  try {
    const { results: todos } = await getTodos();
    const todo = todos.find((todo) => todo.id === +id);
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

const postTodoCreate = async ({ title, desc, author, column }) => {
  try {
    await db.read();

    const { id: lastId } = db.data.lastTodoId;
    const createdAt = getDate();
    const updatedAt = createdAt;

    const newTodo = {
      id: lastId + 1,
      title,
      desc,
      author,
      column,
      createdAt,
      updatedAt,
    };

    db.data.todo.push(newTodo);

    db.data.lastTodoId = { id: lastId + 1 };
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

const deleteTodoById = async (id) => {
  try {
    await db.read();

    const { ok } = await getTodoById(id);
    if (!ok) {
      throw Error("해당하는 ID의 Todo 가 없습니다.");
    }
    const { results: todos } = await getTodos();
    const newTodo = todos.filter((todo) => todo.id !== +id);
    db.data.todo = newTodo;

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
const putTodoById = async (id, updatedData) => {
  try {
    await db.read();

    const { ok: isTodoGet, results: todo } = await getTodoById(id);
    if (!isTodoGet) {
      throw Error("해당하는 ID의 Todo 가 없습니다.");
    }
    const { ok: isTodoDeleted } = await deleteTodoById(id);
    if (!isTodoDeleted) {
      throw Error("Todo 를 삭제할 수 없습니다.");
    }
    const updatedAt = getDate();

    const newTodo = {
      ...todo,
      updatedAt,
      ...updatedData,
    };

    db.data.todo.push(newTodo);

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
 * todo routes
 */
server.post("/todo/create", async (req, res) => {
  const { body } = req;
  const sendData = await postTodoCreate(body);
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
  const sendData = await getTodoById(id);
  res.send(sendData);
});

server.delete("/todo/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
  const sendData = await deleteTodoById(id);
  res.send(sendData);
});

server.put("/todo/:id", async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  const sendData = await putTodoById(id, body);
  res.send(sendData);
});

server.use(router);

server.listen(PORT, () => {
  console.log(`✅ JSON server is listening on ${PORT}`);
});