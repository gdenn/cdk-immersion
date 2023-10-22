import { ITodo } from "../entity";


export interface ITodoService {
  createTodo: (todo: ITodo) => void;
  updateTodo: (id: string, todo: ITodo) => void;
  deleteTodo: (id: string) => void;
  getTodos: () => Promise<ITodo[]>;
  getTodoById: (id: string) => Promise<ITodo>;
}