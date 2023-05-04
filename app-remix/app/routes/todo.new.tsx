import { redirect } from ".pnpm/react-router@6.11.0_react@18.2.0/node_modules/react-router";
import { ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { ClientApi } from "~/libs/clientApi.server";
import { Todo } from "~/models/Todo";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const title = formData.get('title')?.toString() || '';
  const description = formData.get('description')?.toString() || '';

  const body: Omit<Todo, "id"> = {
    title,
    description,
    checked: false,
    updateDate: new Date().toDateString()
  }

  await ClientApi.post('/todo', body);

  return redirect('/');
}

export default function TodoForm() {
  return <Form className="flex flex-col w-1/2" method="POST">
    <div className="flex flex-col">
      <label>Title</label>
      <input type="text" name="title" />
    </div>
    <div className="flex flex-col">
      <label>Description</label>
      <textarea name="description"></textarea>
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </Form>;
}