// create custom hook that fetches todos on useEffect and sets them into the 
// todos state
import { getURL } from "@/lib/fetch";
import { TodoProps } from "../todo";
import useSWR from "swr";


export const useTodos = () => {

  const fetchTodos = async (url: string) =>{ 
    const resp = await fetch(url);
    console.log("got resonse: ", resp.json());
    return resp.json();
  };

  const { data } = useSWR<TodoProps[]>(getURL('/todos'), fetchTodos);

  const todos = data
    ? data
    : [] as TodoProps[];

  return {
    todos,
  }
}