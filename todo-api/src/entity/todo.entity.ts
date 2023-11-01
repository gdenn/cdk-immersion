/**
 * Todo Entity interface type
 */
export interface ITodo {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

/**
 * Implementation of the Todo entity interface
 */
export class Todo implements ITodo {
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
