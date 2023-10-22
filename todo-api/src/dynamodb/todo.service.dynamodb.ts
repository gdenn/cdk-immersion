import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import { ITodo } from "../entity"; 
import { config } from '../config';
import { ITodoService } from '../service';
import { ITodoRepo } from '../repo';

import { DynamoDBTodoRepo } from "./todo.repo.dynamodb";


const region = config.dynamodb.region;
const { tableName, endpoint } = config.dynamodb.tables.todos;

const dynoOptions_: DynamoDB.ClientConfiguration = {
  region,
  endpoint,
}

/**
 * A DynamoDB implementation of the ITodoService interface.
 */
export class TodoDynoService implements ITodoService {

  private readonly repo: ITodoRepo = new DynamoDBTodoRepo(tableName, dynoOptions_);

  public async createTodo(todo: ITodo) {
    this.repo.createTodo(todo);
  };

  public async getTodoById(id: string): Promise<ITodo> {
    return this.repo.getTodoById(id);
  };

  public async deleteTodo(id: string) {
    this.repo.deleteTodo(id);
  };

  public async getTodos(): Promise<ITodo[]> {
    return await this.repo.getTodos();
  };

  public async updateTodo(id: string, todo: ITodo) {
    return await this.repo.updateTodo(id, todo);
  };
}