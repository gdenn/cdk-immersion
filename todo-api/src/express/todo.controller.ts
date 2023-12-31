import { Express } from "express";
import { Request, Response } from "express";
import { ITodo } from "../entity";
import { IServiceRegistry } from "../service";

interface ICreateTodoRequest {
  title: string;
  description: string;
  done: boolean;
}

interface IGetAllTodosRequest {
}

interface IGetTodoByIdRequest {
  id: string;
}

interface IUpdateTodoRequest {
  id: string;
  title?: string;
  description?: string;
  done?: boolean;
}

interface IDeleteTodoRequest {
  id: string;
}

export const createTodoRoutes = (app: Express, serviceRegistry: IServiceRegistry) => {
  const todoController = new TodoController(serviceRegistry);

  app.get('/todos', todoController.getAllTodos);
  app.get('/todos/:id', todoController.getTodoById);
  app.post('/todos', todoController.createTodo);
  app.put('/todos/:id', todoController.updateTodo);
  app.delete('/todos/:id', todoController.deleteTodo);
}

export class TodoController {

  private readonly serviceRegistry: IServiceRegistry;

  constructor(serviceRegistry: IServiceRegistry) {
    this.serviceRegistry = serviceRegistry;

    this.getAllTodos = this.getAllTodos.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.getTodoById = this.getTodoById.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  public async createTodo(req: Request<ICreateTodoRequest>, res: Response) {
    const todo: ITodo = {
      id: "", // will be set by the repo
      title: req.body.title,
      description: req.body.description,
      done: false,
    };

    await this.serviceRegistry.todoService().createTodo(todo);
    res.sendStatus(200);
  }

  public async getAllTodos(_: Request<IGetAllTodosRequest>, res: Response) {

    const todos = await this.serviceRegistry.todoService().getTodos();
    console.debug(`todo.controller: returning todos: ${JSON.stringify(todos)}`);
    res.send(todos);
  }

  public async getTodoById(req: Request<IGetTodoByIdRequest>, res: Response) {
    
    const todo = await this.serviceRegistry.todoService().getTodoById(req.params.id);
    console.debug(`todo.controller: returning todo: ${JSON.stringify(todo)}`);

    if (!todo) {
      res.sendStatus(404);
    } else {
      res.send(todo);
    }
  }

  public async updateTodo(req: Request<IUpdateTodoRequest>, res: Response) {

    console.debug(`todo.controller: updating todo: ${JSON.stringify(req.body)}`);

    await this.serviceRegistry.todoService().updateTodo(req.params.id, {
      id: "", // will be ignored
      title: req.body.title,
      description: req.body.description,
      done: req.body.done,
    });
    res.sendStatus(200);
  }

  public async deleteTodo(req: Request<IDeleteTodoRequest>, res: Response) {

    console.debug(`todo.controller: deleting todo: ${req.params.id}`)
    await this.serviceRegistry.todoService().deleteTodo(
      req.params.id
    );
    res.sendStatus(200);
  }
}