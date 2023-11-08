'use client';

import React from 'react';
import { useTodos } from './hook';
import Todo from '../todo';


const TodoView = () => {
  
  const { todos } = useTodos();

  return (
    <div className='flex flex-col p-5'>
      {todos
        .sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1))
        .map((todo, index) => (
          <Todo key={index} {...todo} />
        )
      )}
    </div>
  );
}


export default TodoView;