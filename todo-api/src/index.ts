import { config } from './config';
import { startExpressService } from './express';

switch(config.useService) {
  case "express":
    console.log("starting express service");
    startExpressService();
    break;
}