// contains a in-memory dto object of the ITodo entity object.
import { ITodo } from "../entity";

export class TodoInMemoryDTO implements ITodo {
  id!: string;
  title!: string;
  description!: string;
  done!: boolean;

  constructor(id: string, title: string, description: string, done: boolean) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = done;
  }
}