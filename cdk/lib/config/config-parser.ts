// contains the interface for the config Object and validation for the config
import { Duration } from "aws-cdk-lib";
import { IIpAddresses } from "aws-cdk-lib/aws-ec2";


export const getAccountId = () => {
  const accountId = process.env.CDK_DEFAULT_ACCOUNT;
  if (!accountId) {
    throw new Error('CDK_DEFAULT_ACCOUNT is not set');
  }
  return accountId;
}

export const getContainerImageTag = () => {
  const containerImageTag = process.env.CONTAINER_IMAGE_TAG;
  if (!containerImageTag) {
    throw new Error('CONTAINER_IMAGE_TAG is not set');
  }
  return containerImageTag;
}
 
export interface IConfig {
  env: {
    account: string;
    region: string;
  };

  application: {

    ssm: {
      backendUrl: string;
    }
    
    fargate: {
      cpu: number;
      memoryLimitMiB: number;
      desiredCount: number;
      minCapacity: number;
      maxCapacity: number;
      targetCpuUtilizationPercent: number;
      containerPort: number;
      scalingCooldown: Duration;
      containerImageTag: string;
    }
  };

  network: {
    ipAddress: IIpAddresses;
  };

  registry: {
    repositoryName: string;
  };
}