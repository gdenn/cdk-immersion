'use client';

import Header from './component/header';
import TodoView from './component/todo-view';
import React from 'react';



export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header title='Generic Todo App' />
      <TodoView />
    </main>
  )
}