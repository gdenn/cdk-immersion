/**
 * The dynamodb dto interface sets the basic fields that are
 * required for a dynamodb data transfer object
 */
export interface IDynoDTO {
  /**
   * The id of the entity, should be a uuidv4.
   */
  id: string;

  /**
   * The created at date in ISO 8601 format.
   */
  ca: string; // created at
  ua: string; // updated at

  /**
   * addition attributes
   */
  [key: string]: any;
}