'use client';

import Header from './component/header';
import TodoView from './component/todo-view';


const todos_ = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Todo ${i + 1}`,
  description: `This is the description for Todo ${i + 1}`,
  done: Math.random() < 0.5,
  onToggle: () => {}
}));


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header title='Generic Todo App' />
      <TodoView todos={todos_} />
    </main>
  )
}