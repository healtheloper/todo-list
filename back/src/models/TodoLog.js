import mongoose from "mongoose";

const todoLogSchema = new mongoose.Schema({
  title: String,
  type: String,
  title: String,
  desc: String,
  author: String,
  columnId: String,
  createdAt: Date,
});

const model = mongoose.model("TodoLog", todoLogSchema);

export default model;
