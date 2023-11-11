// contains the config object that is used to configure the cdk app
import { IpAddresses } from "aws-cdk-lib/aws-ec2";
import { IConfig, getAccountId, getContainerImageTag } from "./config-parser";
import { Duration } from "aws-cdk-lib";

export const config: IConfig = {
  env: {
    account: getAccountId(),
    region: 'eu-central-1',
  },
  
  application: {

    ssm: {
      backendUrl: '/todo-app/backend-url',
    },

    fargate: {
      cpu: 256,
      memoryLimitMiB: 512,
      desiredCount: 1,
      minCapacity: 1,
      maxCapacity: 10,
      targetCpuUtilizationPercent: 50,
      containerPort: 3000,
      scalingCooldown: Duration.seconds(60),
      containerImageTag: getContainerImageTag(), 
    }
  },

  network: {
    ipAddress: IpAddresses.cidr('10.0.0.0/16'),
  },
  registry: {
    repositoryName: 'todo-api',
  },
};