
export default function Home() {
  return (
    <main>
      <form action="/api/todo" method="post">
        <button type="submit">Send</button>
      </form>
    </main>
  )
}
