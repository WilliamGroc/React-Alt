import TodoList from "@/components/Todo/List";
import { todoContext, TodoContext } from "@/context/todo.context";
import { ClientApi } from "@/libs/clientApi.server";
import { Todo } from "@/models/Todo";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useContext } from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await ClientApi.get<Todo[]>('/todo');
  return {
    props: {
      todos: data
    }
  }
}

export default function Home({ todos }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { setTodos } = useContext(todoContext);

  setTodos(todos);

  return (
    <main>
      <Link href="/todo/new">Create Todo</Link>
      <TodoList />
    </main>
  )
}
