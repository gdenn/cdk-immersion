import { Stack, StackProps } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { FargateBackend } from '../constructs/fargate-backend';
import { Repository } from 'aws-cdk-lib/aws-ecr';


interface IApplicationStackProps extends StackProps {
  vpc: Vpc
  repository: Repository,
}

export class ApplicationStack extends Stack {
  constructor(scope: Construct, id: string, props: IApplicationStackProps) {
    super(scope, id, props);

    const {
      vpc,
      repository,
    } = props;

    new FargateBackend(this, "Backend", {
      vpc,
      repository,
    });

    // new StaticFrontend(this, "Frontend", {
    //   backend,
    // });
  }
}
