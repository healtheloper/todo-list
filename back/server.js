const { getDate } = require("./utils");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

const PORT = process.env.PORT || 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/todo/create", (req, res) => {
  const {
    body: { title, desc, author, column },
  } = req;

  const createdAt = getDate();
  const updatedAt = createdAt;

  res.send(
    db.get("todo").push({
      title,
      desc,
      author,
      column,
      createdAt,
      updatedAt,
    })
  );
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
