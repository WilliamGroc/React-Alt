import { todoContext } from "@/context/todo.context";
import { Todo } from "@/models/Todo";
import { useContext } from "react";
import TodoItem from "./Item";

export default function TodoList() {
  const {
    state
  } = useContext(todoContext);

  return <ul>
    {state.sort((a, b) => Number(a.checked) - Number(b.checked)).map((todo: Todo) => <li key={todo.id}>
      <TodoItem todo={todo} />
    </li>)}
  </ul>;
}