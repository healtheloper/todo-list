import express from "express";
import {
  getColumn,
  postColumnCreate,
  deleteColumnDelete,
} from "../controllers/columnController";

const columnRouter = express.Router();

columnRouter.get("/", getColumn);
columnRouter.post("/create", postColumnCreate);
columnRouter.delete("/delete", deleteColumnDelete);

export default columnRouter;
