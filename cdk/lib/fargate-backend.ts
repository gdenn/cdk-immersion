// serves our containerized express js backend application through a Fargate Application
// load balanced service.
// The container image for the service will be served as a cdk container image asset.
import { Construct } from "constructs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { Cluster } from "aws-cdk-lib/aws-ecs";
import { ContainerImage } from "aws-cdk-lib/aws-ecs";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Duration } from "aws-cdk-lib";
import { Repository } from "aws-cdk-lib/aws-ecr";

interface FargateBackendProps {
  vpc: Vpc;
  repository: Repository;
}

export class FargateBackend extends Construct {
  private readonly service: ApplicationLoadBalancedFargateService;

  constructor(scope: Construct, id: string, props: FargateBackendProps) {
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
    const image = ContainerImage.fromEcrRepository(repository, "todo-api-latest");

    // create a load balanced fargate service for our backend
    this.service = new ApplicationLoadBalancedFargateService(this, "BackendService", {
      cluster: cluster,
      cpu: 256,
      desiredCount: 1,
      memoryLimitMiB: 512,
      publicLoadBalancer: true,
      taskImageOptions: {
        image,
        containerPort: 3000,
      },
    });

    repository.grantPull(this.service.taskDefinition.taskRole);
    repository.grant(this.service.taskDefinition.taskRole, 'ecr:GetAuthorizationToken');
    

    // grant task permission to read the container image from cdk asset bucket

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
