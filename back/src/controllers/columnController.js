import Column from "../models/Column";
import { getDate, sendMethodResult } from "../common/utils";

export const getColumn = sendMethodResult(async (req, res) => {
  const columns = await Column.find();
  return columns;
});

export const postColumnCreate = sendMethodResult(async (req, res) => {
  const {
    body: { title },
  } = req;
  const createdAt = getDate();
  const updatedAt = createdAt;
  const newColumn = await Column.create({
    title,
    createdAt,
    updatedAt,
  });
  return newColumn;
});
