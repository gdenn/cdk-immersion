#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApplicationStack } from '../lib/stacks/application.stack';
import { EcrStack } from '../lib/stacks/ecr.stack';
import { NetworkingStack } from '../lib/stacks/networking.stack';
import { IpAddresses } from 'aws-cdk-lib/aws-ec2';

const app = new cdk.App();

const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: 'eu-central-1',
};


const networking = new NetworkingStack(app, 'NetworkingStack', {
  env: devEnv,
  ipAddresses: IpAddresses.cidr('10.0.0.0/16'),
});

const ecr = new EcrStack(app, 'EcrStack', {
  env: devEnv,
});

new ApplicationStack(app, 'TodoAppStack', {
  env: devEnv,
  vpc: networking.getVpc(),
  repository: ecr.getRepository(),
});