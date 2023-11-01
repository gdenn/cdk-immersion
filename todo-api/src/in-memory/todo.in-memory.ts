import { ITodo } from "../entity";
import { v4 as uuidv4 } from "uuid";
import { ITodoRepo } from "../repo";
import { ITodoService } from "../service";

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

export class TodoInMemoryRepo implements ITodoRepo {
  private todos: ITodo[];

  constructor() {
    this.todos = [];
  }

  /**
   * Create a new todo, generate a uuidv4 and a created at and updated at
   * timestamp.
   * 
   * @param todo object without the id
   */
  public async createTodo (todo: ITodo) {
    
    const newTodo = {
      ...todo,
      id: uuidv4().toString(),
    }

    console.debug(`creating todo: ${JSON.stringify(newTodo)}`);

    this.todos.push(newTodo);
  };

  public async deleteTodo (id: string) {
    console.debug(`deleting todo with id: ${id}`);
    this.todos = this.todos.filter(todo => todo.id !== id);
  };

  public async updateTodo (id: string, todo: ITodo) {
    console.debug(`updating todo with id: ${id} to: ${JSON.stringify(todo)}`);
    this.todos = this.todos.map(todo => todo.id === id ? todo : todo);
  };

  public async getTodoById (id: string) {
    
    console.debug(`getting todo with id: ${id}`);
    const foundTodo = this.todos.find(todo => todo.id === id);

    if (foundTodo) {
      console.debug(`found todo: ${JSON.stringify(foundTodo)}`);
      return foundTodo;
    } else {
      throw Error(`could not find todo with id '${id}'`)
    }
  };

  public async getTodos () {
    console.debug(`getting all todos`);
    return this.todos;
  };
}

/**
 * in memory implementation of the ITodoService interface.
 * 
 * The constructor of this class instantiates a concreate TodoInMemoryRepo.
 * All interface methods implemented by this function call the underlying
 * repo functions of the TodoInMemoryRepo.
 */
export class TodoInMemoryService implements ITodoService {

  private readonly repo: ITodoRepo;

  constructor() {
    this.repo = new TodoInMemoryRepo();
  }

  public async createTodo(todo: ITodo) {
    this.repo.createTodo (todo);
  };

  public async deleteTodo(id: string) {
    this.repo.deleteTodo (id);
  };

  public async updateTodo(id: string, todo: ITodo) {
    this.repo.updateTodo (id, todo);
  };

  public async getTodoById(id: string) {
    return this.repo.getTodoById (id);
  }

  public async getTodos() {
    return this.repo.getTodos ();
  }
}