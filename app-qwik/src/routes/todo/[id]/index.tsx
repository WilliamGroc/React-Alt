import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { deleteTodo, getTodo } from "~/api/todo.server";

export const useTodoDetails = routeLoader$(async (requestEvent) => {
  const todo = await getTodo(Number(requestEvent.params.id))

  return {
    todo
  }
});

export const useDeleteTodo = routeAction$(async (data, requestEvent) => {
  await deleteTodo(Number(data.id));

  return requestEvent.redirect(301, '..');
});

export default component$(() => {
  const todoDetailsSignal = useTodoDetails();
  const deleteTodoAction = useDeleteTodo();

  return (<div>
    <Link href="/">Back</Link>
    <div>{todoDetailsSignal.value.todo.title}</div>
    <div>{todoDetailsSignal.value.todo.description}</div>
    <Form action={deleteTodoAction}>
      <input type="hidden" name="id" value={todoDetailsSignal.value.todo.id} />
      <button type="submit">Delete</button>
    </Form>
  </div>);

});