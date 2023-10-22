// This file contains a DynamoDBTodoRepo implementation that
// implements the ITodoRepo interface and extends the CrudRepository<TodoDynoDTO>.
// Code in this file uses the interface ITodo of the high-level Todo entity.

import { v4 as uuidv4 } from 'uuid';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import { ITodo } from "../entity";
import { ITodoRepo } from "../repo";

import { CrudRepository } from "./dynamodb";
import { TodoDynoDTO, mapToTodo, mapToTodoDynoDTO } from "./todo.dto.dynamodb";

/**
 * A DynamoDB implementation of the ITodoRepo interface.
 * 
 * We extend the abstract CrudRepository<TodoDynoDTO> class
*/
export class DynamoDBTodoRepo extends CrudRepository<TodoDynoDTO> implements ITodoRepo {

  constructor(tableName: string, options?: DynamoDB.Types.ClientConfiguration) {
    super(tableName, options);
  }

  /**
   * Create Todo dto object and put it into the dynamodb.
   * Auto generate uuid ID field, created at and updated (dynamodb date compatible)
   * at fields.
   * 
   * Raise an error if the dto with that id already exists.
   * 
   * @param todo object that we create in the dynamodb.
   *  Id, created at and updated at will be ignored.
   */
  public async createTodo(todo: ITodo) {

    const id = uuidv4();

    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const todoDTO = mapToTodoDynoDTO(todo);
    this.put({
      ...todoDTO,
      id,
      ca: createdAt,
      ua: updatedAt,
    });  
  };

  /**
   * Delete an TodoDTO object by a given id from the dynamodb.
   * 
   * Raise an error if the TodoDTO object is not found.
   * 
   * @param id of the TodoDTO object that we delete
   */
  public async deleteTodo(id: string) {
    const todoDTO = await this.get({ id });
    if (todoDTO) {
      this.delete({ id });
    } else {
      throw Error(`could not find todo with id '${id}'`)
    }
  };
  
  /**
   * Update the TodoDTO object by a given id from the dynamodb.
   * Update the updated at timestamp field with a dynamodb compatible 
   * string of time.now().
   * 
   * Raise an error if the TodoDTO object is not found.
   * 
   * @param id of the TodoDTO object that we update
   * @param todo the new attributes of the Todo object that we update
   *  the TodoDTO, created at and updated at will be ignored.
   */
  public async updateTodo(id: string, todo: ITodo) {

    const todoDTO = mapToTodoDynoDTO(todo);

    if (!todoDTO) throw Error(`could not find todo with id '${id}'`)

    this.update(
      { id }, 
      {
        ...todoDTO,
        ua: new Date().toISOString(),
      },
    );
  };

  /**
   * Retrieve the TodoDTO objects by a given id from the dynamodb,
   * map the returns dto objects into Todo entities.
   * 
   * Raise an error if the TodoDTO object is not found or the mapping
   * of the dto to the entity fails.
   */
  public async getTodos(): Promise<ITodo[]> {
    const todoDTOS = await this.scan();
    return todoDTOS.map((todoDTO) => mapToTodo(todoDTO));
  };

  /**
   * Return a single TodoDTO object by a given id from the dynamodb,
   * convert the dto object to an Todo entity.
   * 
   * Raise and error if the TodoDTO object is not found or the mapping
   * of the dto to the entity fails.
   */
  public async getTodoById(id: string): Promise<ITodo> {
    const todoDTO = await this.get({ id });
    if (todoDTO) {
      return mapToTodo(todoDTO);
    } else {
      throw Error(`could not find todo with id '${id}'`)
    }
  }

}