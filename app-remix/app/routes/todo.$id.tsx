import { redirect } from ".pnpm/react-router@6.11.0_react@18.2.0/node_modules/react-router";
import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { ClientApi } from "~/libs/clientApi.server";

export const loader = async ({ params }: LoaderArgs) => {
  const { data } = await ClientApi.get(`/todo/${params.id}`);
  return {
    todo: data
  }
}

export const action = async ({request}: ActionArgs) => {
  const formData = await request.formData();

  const id = formData.get('id');

  await ClientApi.delete(`/todo/${id}`);

  return redirect('/');
}

export default function TodoDetail() {
  const { todo } = useLoaderData<typeof loader>();

  return (<div>
    <Link to="/">Back</Link>
    <div>{todo.title}</div>
    <div>{todo.description}</div>
    <Form method="DELETE">
      <input type="hidden" name="id" value={todo.id} />
      <button type="submit">Delete</button>
    </Form>
  </div>);
}