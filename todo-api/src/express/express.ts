import express from 'express';

import { config } from '../config';
import { IServiceRegistry, ServiceRegistry } from '../service';
import { TodoController } from './todo.controller';

/**
 * Starts the express service by exposing the REST API endpoints
 * through the controler methods.
 */
export const startExpressService = () => {
  
  const app = express();
  app.use(express.json());
  
  console.log("creating service registry")
  const serviceRegistry: IServiceRegistry = new ServiceRegistry(config);
  const todoController = new TodoController(serviceRegistry);

  app.get('/todos', todoController.getAllTodos);
  app.get('/todos/:id', todoController.getTodoById);
  app.post('/todos', todoController.createTodo);
  app.put('/todos/:id', todoController.updateTodo);
  app.delete('/todos/:id', todoController.deleteTodo);

  app.listen(config.express.port, () => {
    console.log(`Server listening at http://localhost:${config.express.port}`);
  });
}