import { Request, Response, Router } from "express";

import Todo, { ITodo } from "../schema/todo";

const todoRouter = Router();

todoRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

todoRouter.post("/api/create", async (req: Request, res: Response) => {
  const todo = req.body;
  const todoCreated: ITodo = await Todo.create(todo);
  console.log("todo created", todoCreated);
  res.json(todoCreated);
});

todoRouter.get("/api/get", async (req: Request, res: Response) => {
  const todo = await Todo.find();
  res.json(todo);
});

export { todoRouter as TodoRouter };
