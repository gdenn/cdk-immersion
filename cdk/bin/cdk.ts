#!/usr/bin/env node
import { config as dotenvConfig } from 'dotenv';
dotenvConfig()

import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApplicationStack } from '../lib/stacks/application.stack';
import { EcrStack } from '../lib/stacks/ecr.stack';
import { NetworkingStack } from '../lib/stacks/networking.stack';
import { config } from '../lib/config/config';


const app = new cdk.App();
const devEnv = { ...config.env };

const networking = new NetworkingStack(app, 'NetworkingStack', {
  env: devEnv,
  ipAddresses: config.network.ipAddress,
});

const ecr = new EcrStack(app, 'EcrStack', {
  env: devEnv,
});

new ApplicationStack(app, 'TodoAppStack', {
  env: devEnv,
  vpc: networking.getVpc(),
  repository: ecr.getRepository(),
});