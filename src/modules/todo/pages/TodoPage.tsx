import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateStatusTodo,
  updateTodo,
} from "@/services/todoService";
import type { TodoForm, TodoModel } from "@/types/todoTypes";
import toast from "react-hot-toast";

export default function TodoPage() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TodoForm>();

  const currentUser: string = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  const onSubmit = (data: TodoForm) => {
    try {
      if (editId) {
        updateTodo(editId, data.title);
        toast.success("Todo updated");
        setEditId(null);
      } else {
        addTodo(data.title);
        toast.success("Todo added");
      }

      setTodos(getTodos());
      reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  const handleEdit = (todo: TodoModel) => {
    setEditId(todo.id);
    setValue("title", todo.title);
  };

  const handleEditStatus = (id: string, status: boolean) => {
    try {
      updateStatusTodo(id, status);
      toast.success("Todo updated");
      setEditId(null);

      setTodos(getTodos());
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  const handleDelete = (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirm) return;

    try {
      deleteTodo(id);
      toast.success("Todo deleted");
      setEditId(null);

      setTodos(getTodos());
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 font-sans py-8 px-4">
      <div className="bg-white rounded shadow p-6 sm:p-8 lg:p-10 w-full max-w-xl lg:max-w-2xl border border-gray-200">
        <h1 className="text-xl lg:text-3xl font-bold text-gray-800 mb-2 text-center">
          Todo List
        </h1>

        <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6 text-center">
          {currentUser ? `"${currentUser}"` : "User not found"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="title"
              type="text"
              autoComplete="off"
              {...register("title", {
                required: "Title required",
                maxLength: {
                  value: 25,
                  message: "Maximum 25 characters",
                },
              })}
              placeholder="Type your todo here..."
              className={`block w-full rounded-md border px-4 py-2 text-base lg:text-lg text-gray-900 placeholder:text-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-indigo-600 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-base lg:text-lg text-white hover:bg-indigo-700 transition"
            >
              {editId ? "Update" : "Save"}
            </button>
          </div>

          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </form>

        <div className="space-y-4 lg:space-y-5">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3"
            >
              <p
                className={`text-base lg:text-lg mb-2 sm:mb-0 ${
                  todo.isComplete ? "line-through text-gray-500" : "text-black"
                }`}
              >
                {todo.title}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditStatus(todo.id, todo.isComplete)}
                  title="Tandai selesai"
                  className="flex items-center gap-1 text-green-600 text-xs lg:text-sm border border-green-600 px-3 py-1.5 rounded-md hover:bg-green-50 hover:text-green-700 transition"
                >
                  ✔️ <span className="hidden sm:inline">Selesai</span>
                </button>

                <button
                  onClick={() => handleEdit(todo)}
                  title="Edit todo"
                  className="flex items-center gap-1 text-yellow-600 text-xs lg:text-sm border border-yellow-600 px-3 py-1.5 rounded-md hover:bg-yellow-50 hover:text-yellow-700 transition"
                >
                  ✏️ <span className="hidden sm:inline">Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(todo.id)}
                  title="Hapus todo"
                  className="flex items-center gap-1 text-red-600 text-xs lg:text-sm border border-red-600 px-3 py-1.5 rounded-md hover:bg-red-50 hover:text-red-700 transition"
                >
                  ❌ <span className="hidden sm:inline">Hapus</span>
                </button>
              </div>
            </div>
          ))}

          {todos?.length === 0 && (
            <p className="text-sm text-gray-400 text-center">Your todo list is empty.</p>
          )}
        </div>

        <div className="pt-8">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="block mx-auto text-red-600 text-sm border border-red-600 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
