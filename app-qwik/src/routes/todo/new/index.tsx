import { component$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import { createTodo } from "~/api/todo.server";
import { Todo } from "~/models/Todo";

export const useCreateTodo = routeAction$(async (data, requestEvent) => {
  const newTodo: Omit<Todo, "id"> = {
    title: data.title.toString(),
    description: data.description.toString(),
    updateDate: new Date().toISOString(),
    checked: false
  };

  await createTodo(newTodo);

  requestEvent.redirect(301, '/');
});

export default component$(() => {
  const createTodoAction = useCreateTodo();

  return (
    <Form action={createTodoAction}>
      <div>
        <label>Title</label>
        <input type="text" name="title" />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description"></textarea>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
});