import { ITodo } from "../entity";

export interface ITodoRepo {
  createTodo: (todo: ITodo) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, todo: ITodo) => void
  getTodoById: (id: string) => Promise<ITodo>;
  getTodos: () => Promise<ITodo[]>;
}