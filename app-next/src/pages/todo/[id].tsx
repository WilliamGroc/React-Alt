import { todoContext } from "@/context/todo.context";
import { ClientApi } from "@/libs/clientApi.server";
import { Todo } from "@/models/Todo";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await ClientApi.get<Todo[]>('/todo');
  return {
    paths: data.map(todo => ({ params: { id: String(todo.id) } })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params) {
    const { data } = await ClientApi.get<Todo>(`/todo/${params.id}`);
    return {
      props: {
        todo: data
      },
      revalidate: 1
    }
  }

  return {
    props: {
      todo: null
    },
    revalidate: 1
  };
}

export default function TodoDetail({ todo }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { deleteTodo } = useContext(todoContext);

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    router.push('/')
  }

  return (<div>
    <Link href="/">Back</Link>
    <div>{todo.title}</div>
    <div>{todo.description}</div>
    <button onClick={handleDelete}>Delete</button>
  </div>);
}