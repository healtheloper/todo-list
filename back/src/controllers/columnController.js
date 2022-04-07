import Column from "../models/Column";
import { getDate, dataTemplate } from "../common/utils";

export const getColumn = async (req, res) => {
  try {
    const columns = await Column.find();
    res.send(dataTemplate(columns));
  } catch (error) {
    res.send({
      ok: false,
      message: error.message,
    });
  }
};

export const postColumnCreate = async (req, res) => {
  try {
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
    res.send(dataTemplate(newColumn));
  } catch (error) {
    res.send({
      ok: false,
      message: error.message,
    });
  }
};

export const deleteColumnDelete = async () => {};
