// serves our containerized express js backend application through a Fargate Application
// load balanced service.
// The container image for the service will be served as a cdk container image asset.
import { Construct } from "constructs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { Cluster } from "aws-cdk-lib/aws-ecs";
import { ContainerImage } from "aws-cdk-lib/aws-ecs";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { CfnOutput, Duration } from "aws-cdk-lib";
import { Repository } from "aws-cdk-lib/aws-ecr";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { config } from "../config/config";

interface IFargateBackendProps {
  vpc: Vpc;
  repository: Repository;
}

export class FargateBackend extends Construct {
  private readonly service: ApplicationLoadBalancedFargateService;

  constructor(scope: Construct, id: string, props: IFargateBackendProps) {
    super(scope, id);

    const {
      vpc,
      repository,
    } = props;

    // create a cluster for our backend service
    const cluster = new Cluster(this, "BackendCluster", {
      vpc: vpc,
    });

    // get the container image from the ECr repository
    const image = ContainerImage.fromEcrRepository(repository, config.application.fargate.containerImageTag);

    // create a load balanced fargate service for our backend
    this.service = new ApplicationLoadBalancedFargateService(this, "BackendService", {
      cluster: cluster,
      cpu: config.application.fargate.cpu,
      desiredCount: config.application.fargate.desiredCount,
      memoryLimitMiB: config.application.fargate.memoryLimitMiB,
      publicLoadBalancer: true,
      taskImageOptions: {
        image,
        containerPort: config.application.fargate.containerPort,
      },
    });

    // grant the task role access to the ECR repository
    repository.grantPull(this.service.taskDefinition.taskRole);
    repository.grant(this.service.taskDefinition.taskRole, 'ecr:GetAuthorizationToken');
    
    // create a scaling policy for the service
    const scaling = this.service.service.autoScaleTaskCount({
      minCapacity: config.application.fargate.minCapacity,
      maxCapacity: config.application.fargate.maxCapacity,
    });
    
    // set target tracking policy for the service
    scaling.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: config.application.fargate.targetCpuUtilizationPercent,
      scaleInCooldown: config.application.fargate.scalingCooldown,
      scaleOutCooldown: config.application.fargate.scalingCooldown,
    });

    // save the load balancer url as a cdk output
    new CfnOutput(this, "BackendServiceURL", {
      value: this.service.loadBalancer.loadBalancerDnsName,
    });

    // save the load balancer url as a SSM config param
    new StringParameter(this, "BackendServiceURLParam", {
      parameterName: config.application.ssm.backendUrl,
      stringValue: this.service.loadBalancer.loadBalancerDnsName,
    });
  }

  public getBackendEndpointURL() {
    return this.service.loadBalancer.loadBalancerDnsName;
  }
}
