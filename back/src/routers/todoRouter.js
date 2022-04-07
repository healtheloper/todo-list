import express from "express";

const todoRouter = express.Router();

todoRouter.get("/", (req, res) => {
  res.send("todo get /");
});

export default todoRouter;
