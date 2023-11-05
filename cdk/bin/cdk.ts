#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Networking } from '../lib/networking.stack';
import { TodoApp } from '../lib/todo-app.stack';

const app = new cdk.App();

const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};


const networking = new Networking(app, 'NetworkingStack', {
  env: devEnv,
});

new TodoApp(app, 'TodoAppStack', {
  env: devEnv,
  vpc: networking.getVpc(),
});