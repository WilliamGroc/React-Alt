import { component$ } from '@builder.io/qwik';
import { DocumentHead, Link, routeAction$, routeLoader$ } from '@builder.io/qwik-city';
import { checkTodo, getAllTodos } from '~/api/todo.server';

export const useTodos = routeLoader$(async () => {
  return {
    todos: (await getAllTodos()).sort(data => data.checked ? 1 : -1)
  };
});

export const useCheckTodo = routeAction$(async (data) => {
  await checkTodo(Number(data.id), Boolean(data.checked));
})

export default component$(() => {
  const todosSignal = useTodos();
  const checkTodoAction = useCheckTodo();

  return (
    <>
      <Link href="/todo/new">New todo</Link>
      <div>
        {todosSignal.value.todos.map(todo => <div key={todo.id}>
          <input type='checkbox' checked={todo.checked} onChange$={() => {
            checkTodoAction.submit({ id: todo.id, checked: !todo.checked })
          }} />
          <Link href={`/todo/${todo.id}`}>{todo.title}</Link>
        </div>)}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
