// react custom hook that provides a method to createTodos

import { getURL } from "@/lib/fetch";
import { useState } from "react";
import { mutate } from "swr";

export const useCreateTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async () => {

    console.log("submitting todo: ", {
      title,
      description,
      done: false,
    });

    await mutate(getURL('/api/todos'), {
      title,
      description,
      done: false,
    }, false);
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    onSubmit,
  }
}