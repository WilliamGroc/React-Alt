import { Todo } from "../models/Todo";
import { ClientApi } from "./clientApi.server";

export async function getAllTodos(): Promise<Todo[]> {
  const { data } = await ClientApi.get('/todo');
  return data
}

export async function getTodo(id: number) {
  const { data } = await ClientApi.get(`/todo/${id}`);
  return data
}

export async function createTodo(todo: Omit<Todo, 'id'>) {
  const { data } = await ClientApi.post('/todo', todo);
  return data
}

export async function deleteTodo(id: number) {
  await ClientApi.delete(`/todo/${id}`);
}

export async function checkTodo(id: number, checked: boolean) {
  const { data } = await ClientApi.patch(`/todo/${id}`, { checked });
  return data;
}