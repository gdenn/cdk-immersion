// factory that instantiates all service objects for a specifc
// implementation like the TodoService

import { IConfig, PersistenceLayer } from "../config";
import { TodoDynoService } from "../dynamodb";
import { TodoInMemoryService } from "../in-memory";

import { ITodoService } from "./todo.service";

export interface IServiceRegistry {
  todoService: () => ITodoService;
}

export class ServiceRegistry implements IServiceRegistry {

  private readonly todoService_: ITodoService;

  constructor(config: IConfig) {

    const { usePersistenceLayer } = config;

    this.todoService_ = this.createTodoServiceFor(usePersistenceLayer);
  }

  private createTodoServiceFor(persistenceLayer: PersistenceLayer): ITodoService {
    switch(persistenceLayer) {
      case "dynamodb":
        console.debug("creating dynamodb todo service")
        return new TodoDynoService();
      case "in-memory":
        console.debug("creating in-memory todo service")
        return new TodoInMemoryService();
    }
  }

  public todoService() { 
    return this.todoService_;
  }
}
