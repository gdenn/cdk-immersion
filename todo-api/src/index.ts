import { config } from './config';
import { startExpressService } from './express';

/**
 * Starts the service layer based on the configuration.
 */
switch(config.useService) {
  case "express":
    console.log("starting express service");
    startExpressService();
    break;
}