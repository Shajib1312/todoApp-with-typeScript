import Todo from "@/components/Todo";
import styles from "./page.module.css";
import AddTodo from "@/components/AddTodo";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <h2>TODO NEXT + TASK</h2>
      <Navbar />
      <AddTodo />
      <Todo />
    </main>
  );
}
