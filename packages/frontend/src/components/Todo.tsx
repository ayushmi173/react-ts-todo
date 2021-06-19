import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { api } from "../api/api";

interface ITodo {
  id: string;
  todo_item: string;
  expected_completion: string;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isEditClick, setIsEditClick] = useState<string>("");
  const [addTodofield, setAddTodoField] = useState("");
  const [editedTodoField, setEditedTodoField] = useState<Omit<ITodo, "id">>({
    todo_item: "",
    expected_completion: "",
  });

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const todos: ITodo[] = await api("/todos", "GET");
    setTodos(todos);
  };

  const handleTodoDelete = async (todoItem: ITodo) => {
    const response = await api("/todo/delete", "DELETE", { id: todoItem.id });
    if (response) getTodos();
  };

  const handleTodoSave = async (todoItem: ITodo) => {
    const response = await api("/todo/update", "PUT", {
      id: todoItem.id,
      todo_item: editedTodoField.todo_item,
    });
    if (response) getTodos();
    setEditedTodoField({
      todo_item: "",
      expected_completion: "",
    });
    setIsEditClick("");
  };

  const handleTodoAdd = async () => {
    const response = await api("/todo/create", "POST", {
      id: uuid(),
      todo_item: addTodofield,
    });
    if (response) getTodos();
    setEditedTodoField({
      todo_item: "",
      expected_completion: "",
    });
    setIsEditClick("");
    setAddTodoField("");
  };

  const handleInputChange = (key: string, value: string) => {
    setEditedTodoField({
      ...editedTodoField,
      [key]: value,
    });
  };

  return (
    <>
      <h1> Todo Full Fledged Web App</h1>
      <table
        style={{
          backgroundColor: "rgb(243 243 243)",
          padding: "10px",
        }}
      >
        {todos.map((todoItem) => {
          return (
            <tr>
              <td>{todoItem.id}</td>
              <td>
                {isEditClick === todoItem.id ? (
                  <>
                    <input
                      type="text"
                      value={editedTodoField.todo_item}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("todo_item", event.target.value)
                      }
                    />
                  </>
                ) : (
                  todoItem.todo_item
                )}
              </td>
              <td>{todoItem.expected_completion}</td>
              <td>
                <button onClick={() => setIsEditClick(todoItem.id)}>
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => handleTodoDelete(todoItem)}>
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => handleTodoSave(todoItem)}>Save</button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td>Add New Todo</td>
          <td>
            <input
              type="text"
              value={addTodofield}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setAddTodoField(event.target.value)
              }
            />
          </td>
          <td>
            <button onClick={handleTodoAdd}>add</button>
          </td>
        </tr>
      </table>
    </>
  );
};

export default Todo;
