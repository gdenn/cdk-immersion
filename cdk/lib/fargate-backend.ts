// serves our containerized express js backend application through a Fargate Application
// load balanced service.
// The container image for the service will be served as a cdk container image asset.
import { Construct } from "constructs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { Cluster } from "aws-cdk-lib/aws-ecs";
import { ContainerImage } from "aws-cdk-lib/aws-ecs";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Duration } from "aws-cdk-lib";

interface FargateBackendProps {
  vpc: Vpc;
}

export class FargateBackend extends Construct {
  private readonly service: ApplicationLoadBalancedFargateService;

  constructor(scope: Construct, id: string, props: FargateBackendProps) {
    super(scope, id);

    const {
      vpc
    } = props;

    // create a cluster for our backend service
    const cluster = new Cluster(this, "BackendCluster", {
      vpc: vpc,
    });

    // create a load balanced fargate service for our backend
    this.service = new ApplicationLoadBalancedFargateService(this, "BackendService", {
      cluster: cluster,
      cpu: 256,
      desiredCount: 1,
      memoryLimitMiB: 512,
      publicLoadBalancer: true,
      taskImageOptions: {
        image: ContainerImage.fromAsset("../todo-api"),
        containerPort: 3000,
      },
    });

    const scaling = this.service.service.autoScaleTaskCount({
      minCapacity: 1,
      maxCapacity: 10,
    });
    
    scaling.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 50,
      scaleInCooldown: Duration.seconds(60),
      scaleOutCooldown: Duration.seconds(60),
    });
  }

  public getBackendEndpointURL() {
    return this.service.loadBalancer.loadBalancerDnsName;
  }
}
