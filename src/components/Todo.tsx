"use client";
import { TODO, useTodos } from "@/store/todos";
import { useSearchParams } from "next/navigation";

const Todo = () => {
  const searchParams = useSearchParams();

  const todosFilter = searchParams.get("todos");

  const { todos, handleTodoDelete, toggleAsCompeted } = useTodos();

  //   console.log(todos);
  let filterTodo = todos;

  if (todosFilter === "active") {
    filterTodo = filterTodo.filter((todo) => !todo.completed);
  } else if (todosFilter === "completed") {
    filterTodo = filterTodo.filter((todo) => todo.completed);
  }

  return (
    <ul>
      {filterTodo.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="checkbox"
              checked={todo.completed}
              id={`todo-${todo.id}`}
              onChange={() => toggleAsCompeted(todo.id)}
            />
            <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
            {todo.completed && (
              <button type="button" onClick={() => handleTodoDelete(todo.id)}>
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};
export default Todo;
