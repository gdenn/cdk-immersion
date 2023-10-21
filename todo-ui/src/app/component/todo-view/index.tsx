'use client';

import React from 'react';
import Todo, { TodoProps } from '../todo';

interface TodoViewProps {
  todos: TodoProps[];
}

const TodoView: React.FC<TodoViewProps> = ({ todos }: TodoViewProps) => (
  <div className='flex flex-col p-5'>
    {todos
      .sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1))
      .map((todo, index) => (
        <Todo key={index} {...todo} />
      )
    )}
  </div>
);

export default TodoView;