"use client";

import { ClientApi } from "@/libs/clientApi.server";
import { Todo } from "@/models/Todo";
import { createContext, ReactNode, useState } from "react";

export type TodoContextFunctions = {
  checkTodo: (id: number, value: boolean) => Promise<void>;
  createTodo: (todo: Omit<Todo, "id">) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  setTodos: (todos: Todo[]) => void
  state: Todo[];
}


const useTodo = (): TodoContextFunctions => {

  const [state, setState] = useState<Todo[]>([]);

  const setTodos = (todos: Todo[]) => {
    setState(todos);
  }

  const createTodo = async (todo: Omit<Todo, "id">) => {
    const { data } = await ClientApi.post('/todo', todo);
    setState(current => ([...current, data]));
  }

  const checkTodo = async (id: number, value: boolean) => {
    const { data } = await ClientApi.patch(`/todo/${id}`, { checked: value });
    setState(current => {
      const todoIndex = current.findIndex(todo => todo.id === id);
      const nextState = [...current];
      nextState[todoIndex] = data;
      return nextState;
    });
  }

  const deleteTodo = async (id: number) => {
    await ClientApi.delete(`/todo/${id}`);
    setState(current => current.filter(item => item.id !== id));
  }

  return {
    createTodo,
    checkTodo,
    deleteTodo,
    setTodos,
    state
  }
}

export const todoContext = createContext<TodoContextFunctions>({} as any);

export const TodoContext = ({ children }: { children: ReactNode }) => {
  const hook = useTodo();
  return <todoContext.Provider value={hook}>
    {children}
  </todoContext.Provider>
}