// in memory implementation of the ITodoService interface.
// this service is used for local testing or mocking during test cases.

import { ITodo } from "../entity";
import { ITodoRepo } from "../repo";
import { ITodoService } from "../service";

import { TodoInMemoryRepo } from "./todo.repo.in-memory";

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