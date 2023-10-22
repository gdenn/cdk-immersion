// contains a config object for the backend application
// that specifies ports table names and which database to use.

import { IConfig } from './config-types';

/**
 * Config object for the backend application.
 */
export const config: IConfig = {
  /**
   * Configures the express controller layer
   */
  express: {
    /**
     * The port the express server will listen on
     */
    port: 3000,
  },
  /**
   * Configures the dynamodb persistence layer
   */
  dynamodb: {
    /**
     * The region where the dynamodb tables are located, this
     * value should be passed in through the environment but
     * defaults to eu-central-1 as this is the default region
     * for all deployments
     */
    region: process.env.DYNAMODB_REGION || "eu-central-1",

    /**
     * contains configuration parameters required by the dynamodb repositories
    */
   tables: {
      todos: {
        /**
         * endpoint of the dynamodb table, this value
         * should be passed in through the environment but
         * defaults to localhost:8000 for local development
         * when the dynamodb runs in a docker container
         */
        endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",

        /**
         * name of the dynamodb tables that stores all todo entitites
         */
        tableName: "todos",
      },
    }
  },
  /**
   * configures which persistence layer will be used.
   * @example usePersistenceLayer: "dynamodb" - uses a dynamodb implementation
   *  that stores the items in dynamodb tables.
   * 
   * @example usePersistenceLayer: "in-memory" - uses a mock implementation
   *  that stores all items in-memory
   */
  usePersistenceLayer: "in-memory",

  /**
   * configures which service layer will be used.
   * @example useService: "express" - uses a express REST API implementation
   */
  useService: "express",
};
