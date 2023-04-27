import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { makeDomainFunction } from 'domain-functions';
import { formAction } from "~/form-action.server";
import { Form } from "~/form";
import { Todo } from "~/models/Todo";
import { createTodo } from "~/api/todo.server";

const schema = z.object({
  title: z.string().min(1),
  description: z.string()
});

const mutation = makeDomainFunction(schema)(async (values) => {
  const newTodo: Omit<Todo, "id"> = {
    title: values.title,
    description: values.description,
    checked: false,
    updateDate: new Date().toISOString()
  };

  await createTodo(newTodo);
})


export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema,
    mutation,
    successPath: '..',
  });

export default function TodoCreate() {

  return (<Form schema={schema} />);
}