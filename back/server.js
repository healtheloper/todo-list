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

server.post("/todo/create", async (req, res) => {
  await db.read();
  const { id: lastId } = db.data.lastTodoId;

  const {
    body: { title, desc, author, column },
  } = req;

  const createdAt = getDate();
  const updatedAt = createdAt;

  const newTodo = db.data.todo.push({
    id: lastId + 1,
    title,
    desc,
    author,
    column,
    createdAt,
    updatedAt,
  });

  if (!newTodo) {
    throw Error("push 에러");
  }

  db.data.lastTodoId = { id: lastId + 1 };
  await db.write();
  res.send({
    ok: true,
  });
});

server.get("/todo/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  res.send(db.get("todo").find({ id }).value());
});

server.use(router);

server.listen(PORT, () => {
  console.log(`✅ JSON server is listening on ${PORT}`);
});
