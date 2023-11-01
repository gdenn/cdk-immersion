import { v4 as uuidv4 } from "uuid";
import { DynamoDB } from "aws-sdk";
import { config } from "../config";
import { ITodo, Todo } from "../entity";
import { CrudRepository, IDynoDTO } from "./dynamodb";
import { ITodoRepo } from "../repo";
import { ITodoService } from "../service";

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