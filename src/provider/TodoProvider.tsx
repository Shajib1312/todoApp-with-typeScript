
"use client";
import { TodoContext, todoContext } from "@/store/todos";
import { useContext, useEffect, useState } from "react";

const TodoProvider = ({ children }: { children: React.ReactNode; }) => {
    const todosContextValue: todoContext | null = useContext(TodoContext);
    if (!todosContextValue) {
        throw new Error("UserTodos outside of provider");
    }
    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
    }, []);

    if (mount) {
        return <div>{children}</div>;
    }

    return null;
}
export default TodoProvider