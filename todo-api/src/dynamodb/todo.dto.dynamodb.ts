import { Todo } from "../entity";

import { IDynoDTO } from "./dto.dynamodb";

/**
 * Converts a dyno data transfer object to an entity object.
 */
export const mapToTodo = (dto: TodoDynoDTO): Todo => ({
  id: dto.id,
  title: dto.ti,
  description: dto.de,
  done: dto.do,
});

/**
 * Converts an entity object to a dyno data transfer object.
 */
export const mapToTodoDynoDTO = (todo: Todo): TodoDynoDTO => ({ 
  id: todo.id,
  ti: todo.title,
  de: todo.description,
  do: todo.done,
  ca: new Date().toISOString(), 
  ua: new Date().toISOString(), 
});

/**
 * A dyno data transfer object for Todos.
 * 
 * The attributes in the dto contains only two letters
 * to optimize write and read capacity usage and storage costs
 * in the dynamodb.
 * 
 * Dynamodb storage costs and cost of read and write capacity units
 * include key and attribute names and value size.
 */
export class TodoDynoDTO implements IDynoDTO {

  ca!: string;    // created at
  ua!: string;    // updated at

  id!: string;    // uuid

  ti!: string;    // title
  de!: string;    // description
  do!: boolean;   // done flag
}