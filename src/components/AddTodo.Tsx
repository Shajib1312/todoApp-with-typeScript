"use client";
import { useTodos } from "@/store/todos";
import { ChangeEvent, useState } from "react";

const AddTodo = () => {
  const [todo, setTodo] = useState("");

  const { handleAddTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleAddTodo(todo);
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Write your Todo"
        value={todo}
        onChange={(e: ChangeEvent<HTMLInputElement>): void =>
          setTodo(e.target.value)
        }
        type="text"
      />
      <button>Add Todo</button>
    </form>
  );
};

export default AddTodo;
