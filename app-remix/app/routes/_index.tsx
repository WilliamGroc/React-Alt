import { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
import axios from "axios";
import { useState } from "react";
import { ClientApi } from "~/libs/clientApi.server";
import { Todo } from "~/models/Todo";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New TodoList Remix" }];
};

function sortTodo(a: Todo, b: Todo) {
  return Number(a.checked) - Number(b.checked)
}

export const loader = async () => {
  const { data } = await ClientApi.get<Todo[]>('/todo');
  return {
    todos: data.sort(sortTodo)
  }
}

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  switch (request.method) {
    case 'PATCH':
      const id = formData.get('id');
      const checked = formData.get('checked');
      await ClientApi.patch(`/todo/${id}`, { checked: !!checked });
      return null;
  }

  return null;
}

export default function Index() {
  const { todos } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <div>
      <Link to="/todo/new">Create Todo</Link>
      <ul>
        {todos.map(todo => <li key={todo.id} style={{ display: 'flex' }}>
          <Form onChange={e => fetcher.submit(e.currentTarget, { method: 'PATCH' })}>
            <input type="hidden" name="id" value={todo.id} />
            <input type="checkbox" defaultChecked={todo.checked} name="checked" />
          </Form>
          <Link to={`/todo/${todo.id}`}>
            {todo.title}
          </Link>
        </li>)}
      </ul>
    </div>
  );
}
