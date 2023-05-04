import { TodoContext } from '@/context/todo.context'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <TodoContext>
    <Component {...pageProps} />
  </TodoContext>
}
