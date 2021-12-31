import { Schema, model, Document } from "mongoose";

export interface ITodo extends Document {
  id: string;
  todo_item: string;
  expected_completion: string;
}

const TodoSchema = new Schema({
  id: { type: String, required: false, unique: true },
  todo_item: { type: String, required: true },
  expected_completion: { type: Date, default: Date.now() },
});

export default model<ITodo>("Todo", TodoSchema);
