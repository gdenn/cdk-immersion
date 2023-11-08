import express from 'express';

import { config } from '../config';
import morgan from 'morgan';
import cors from 'cors';
import { IServiceRegistry, ServiceRegistry } from '../service';
import { createTodoRoutes } from './todo.controller';

/**
 * Starts the express service by exposing the REST API endpoints
 * through the controler methods.
 */
/**
 * Starts the Express service.
 * @returns void
 */
export const startExpressService = () => {
  
  const app = express();
  
  // use morgen logging middleware for all requests in debug mode
  app.use(morgan('dev'));

  // use cors middleware for all requests
  app.use(cors({
    origin: 'http://localhost:8080', // Allow CORS from http://localhost:8080
  }));
  
  app.use(express.json());
  
  console.log("creating service registry")
  const serviceRegistry: IServiceRegistry = new ServiceRegistry(config);

  createTodoRoutes(app, serviceRegistry);

  app.listen(config.express.port, () => {
    console.log(`Server listening at http://localhost:${config.express.port}`);
  });
}