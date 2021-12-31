import { Request, Response, Router } from "express";

import Todo, { ITodo } from "../schema/todo";

const todoRouter = Router();

todoRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

todoRouter.post("/api/todo/create", async (req: Request, res: Response) => {
  try {
    const { id, todo_item } = req.body;
    console.log(id, todo_item);
    const todoCreated: ITodo = await Todo.create({
      id: id,
      todo_item: todo_item,
    });
    console.log(todoCreated, "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    res.status(200).send(todoCreated);
  } catch (err) {
    res.send(err);
  }
});

todoRouter.get("/api/todos", async (req: Request, res: Response) => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).send(todos);
  } catch (err) {
    res.send(err);
  }
});

todoRouter.put("/api/todo/update", async (req: Request, res: Response) => {
  try {
    const updatetedTodo: ITodo | null = await Todo.findOneAndUpdate(
      { id: req.body.id },
      { todo_item: req.body.todo_item },
      { new: true }
    );
    res.status(200).send({ result: updatetedTodo });
  } catch (err) {
    res.send(err);
  }
});

todoRouter.delete("/api/todo/delete", async (req: Request, res: Response) => {
  try {
    const deletedTodo: ITodo | null = await Todo.findOneAndDelete({
      id: req.body.id,
    });
    res.status(200).send({ result: deletedTodo });
  } catch (err) {
    res.send(err);
  }
});

export { todoRouter as TodoRouter };
