"use client";

import { todoContext } from "@/context/todo.context";
import { Todo } from "@/models/Todo";
import Link from "next/link";
import { useContext } from "react";


export default function TodoItem({ todo }: { todo: Todo }) {

  const { checkTodo } = useContext(todoContext);

  return <>
    <input type="checkbox" checked={todo.checked} onChange={(e) => checkTodo(todo.id, e.target.checked)} />
    <Link href={`/todo/${todo.id}`}>{todo.title}</Link>
  </>
}