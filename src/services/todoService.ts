import type { TodoForm, TodoModel } from "@/types/todoTypes";

export const getTodos = (): TodoModel[] => {
  const currentUser: string = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const todos: TodoModel[] = JSON.parse(localStorage.getItem("todos") || "[]");

  return todos.filter((t: TodoModel) => t.createdBy === currentUser);
};

export const addTodo = (title: string): TodoForm => {
  const currentUser: string = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const todos: TodoModel[] = JSON.parse(localStorage.getItem("todos") || "[]");

  const newTodo: TodoModel = {
    id: crypto.randomUUID(),
    title,
    isComplete: false,
    createdBy: currentUser,
  };

  const updatedTodos: TodoModel[] = [...todos, newTodo];

  localStorage.setItem("todos", JSON.stringify(updatedTodos));

  return newTodo;
};

export const updateTodo = (id: string, updatedTitle: string): void => {
  const todos: TodoModel[] = JSON.parse(localStorage.getItem("todos") || "[]");

  const updatedTodos: TodoModel[] = todos.map((todo) =>
    todo.id === id ? { ...todo, title: updatedTitle } : todo
  );

  localStorage.setItem("todos", JSON.stringify(updatedTodos));
};

export const updateStatusTodo = (id: string, updatedStatus: boolean): void => {
  const todos: TodoModel[] = JSON.parse(localStorage.getItem("todos") || "[]");

  const updatedTodos: TodoModel[] = todos.map((todo) =>
    todo.id === id ? { ...todo, isComplete: !updatedStatus } : todo
  );

  localStorage.setItem("todos", JSON.stringify(updatedTodos));
};

export const deleteTodo = (id: string): void => {
  const allTodos: TodoModel[] = JSON.parse(localStorage.getItem("todos") || "[]");

  const updatedTodos = allTodos.filter((todo) => todo.id !== id);
  
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
};
