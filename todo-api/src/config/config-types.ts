/**
 * The list of persistence layers supported by the application.
 * @example "dynamodb" uses the dynamodb implementation for the repositories
 */
const persistenceLayers_ = [
  "dynamodb",
  "in-memory",
 ] as const;
 export type PersistenceLayer = typeof persistenceLayers_[number];

 /**
  * The list of DynamoDB tables used by the application.
  */
const dynoTables_ = [
  "todos",
 ] as const;
export type DynoTable = typeof dynoTables_[number];

const services_ = [
  "express",
] as const;
export type Service = typeof services_[number];

/**
 * The configuration of the application.
 */
export interface IConfig {
  express: IExpressConfig;
  dynamodb: IDynamoDBConfig;
  usePersistenceLayer: PersistenceLayer
  useService: Service;
}

/**
 * The configuration of the express server.
 */
interface IExpressConfig {
  port: number;
}

/**
 * The configuration of the DynamoDB persistence layer.
 */
interface IDynamoDBConfig {
  region: string;
  tables: Record<DynoTable, IDynamoDBTableConfig>;
}

/**
 * The configuration of a DynamoDB table.
 */
interface IDynamoDBTableConfig {
  endpoint: string;
  tableName: string;
}