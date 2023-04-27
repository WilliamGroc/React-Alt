import { ActionArgs, V2_MetaFunction, redirect } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData, useSubmit } from "@remix-run/react";
import { checkTodo, getAllTodos } from "~/api/todo.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export async function loader() {
  const todos = await getAllTodos();
  todos.sort(data => data.checked ? 1 : -1);
  return {
    todos
  };
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const isChecked = formData.get('checked') === 'true';
  await checkTodo(Number(formData.get('id')), isChecked);
  return redirect('.');
}

export default function Index() {
  const fetcher = useFetcher();
  const { todos } = useLoaderData<typeof loader>();

  return (
    <div>
      <Link to="/todo/new">New todo</Link>
      <div>
        {todos.map(todo => (<div key={todo.id}>
          <input
            type="checkbox"
            name="checked"
            checked={todo.checked}
            disabled={fetcher.state === 'submitting'}
            onChange={(e) => {
              fetcher.submit({ id: String(todo.id), checked: String(e.target.checked) }, { method: 'post' })
            }}
          />
          <Link to={`/todo/${todo.id}`}>{todo.title}</Link>
        </div>))}
      </div>
    </div>
  );
}
