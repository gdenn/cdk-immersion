'use client';

import { Button } from "flowbite-react";
import React, { useState } from "react";


export interface TodoProps {
  id: number;
  title: string;
  description: string;
  done: boolean;
  onToggle: () => void;
}

const Todo: React.FC<TodoProps> = ({ title, description, done, onToggle }: TodoProps) => {

  const [isDone, setDone] = useState(done);

  const toggleIsDone = () => {
    setDone(!isDone);
  }

  const lineStyle = isDone 
    ? "line-through" : 
    "";

  return (
    <div className="flex flex-col p-5 bg-gray-700 my-2 border border-gray-300 rounded-lg items-start gap-3">
      <h2 className={`${lineStyle} text-semibold text-xl`}>{title}</h2>
      <p>{description}</p>
      <span className="self-end">
        <Button size={"sm"} onClick={toggleIsDone}>{isDone ? 'Undo' : 'Done'}</Button>
      </span>
    </div>
  );
}

export default Todo;