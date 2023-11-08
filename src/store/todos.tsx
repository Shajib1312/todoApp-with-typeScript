"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
export type TODO = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type todoContext = {
  todos: TODO[];
  handleAddTodo: (task: string) => void;
  handleTodoDelete: (id: string) => void;
  toggleAsCompeted: (id: string) => void;
};

export const TodoContext = createContext<todoContext | null>(null);

export const TodoContextProvider = ({ children }: { children: React.ReactNode; }) => {
  const [todos, setTodos] = useState<TODO[]>(() => {
    let newTodos: TODO[] = [];
    if (typeof window !== 'undefined') {
      // Check if we are in a browser environment
      const newTodosStr = localStorage.getItem("todos") || "[]";
      newTodos = JSON.parse(newTodosStr) as TODO[];
    }
    return newTodos;
  });


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (task: string) => {
    setTodos((prev) => {
      const newTodos: TODO[] = [
        {
          id: Math.random().toString(),
          task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  // if todo is completed
  const toggleAsCompeted = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  // if todo is Deleted

  const handleTodoDelete = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.filter((task) => task.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  return (
    <TodoContext.Provider
      value={{ todos, handleAddTodo, handleTodoDelete, toggleAsCompeted }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Creating custom Hook for todos
export function useTodos() {
  const todosContextValue: todoContext | null = useContext(TodoContext);
  if (!todosContextValue) {
    throw new Error("UserTodos outside of provider");
  }
  return todosContextValue;
}
