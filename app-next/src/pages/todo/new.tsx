import { todoContext } from "@/context/todo.context"
import { useRouter } from "next/router";
import { FormEvent, useContext } from "react"

export default function TodoForm() {
  const { createTodo } = useContext(todoContext);
  const router = useRouter();

  console.log(createTodo)
  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createTodo({
      title: formData.get('title')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      checked: false,
      updateDate: new Date().toDateString()
    });

    router.push('/');
  }

  return <form className="flex flex-col w-1/2" onSubmit={handleSend}>
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
  </form>
}