import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { deleteTodo, getTodo } from "~/api/todo.server";
import invariant from "tiny-invariant";
import { Todo } from "~/models/Todo";

export async function loader({ params }: LoaderArgs): Promise<{ todo: Todo }> {
  invariant(params.id, "Todo id not found");
  invariant(Number(params.id), "Todo id not a number");

  const todo = await getTodo(Number(params.id))

  return {
    todo
  }
}

export async function action({ request }: ActionArgs) {
  const dataForm = await request.formData();
  const todoId = dataForm.get('id');
  await deleteTodo(Number(todoId));
  return redirect('..');
}

export default function TodoDetail() {
  const { todo } = useLoaderData<typeof loader>();

  return (<div>
    <Link to="/">Back</Link>
    <div>{todo.title}</div>
    <div>{todo.description}</div>
    <Form method="post">
      <input type="hidden" name="id" value={todo.id} />
      <button type="submit">Delete</button>
    </Form>
  </div>);
}