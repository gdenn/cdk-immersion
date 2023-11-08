import { Stack, StackProps } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { FargateBackend } from './fargate-backend';
import { Repository } from 'aws-cdk-lib/aws-ecr';


interface TodoAppProps extends StackProps {
  vpc: Vpc
  repository: Repository,
}

export class TodoApp extends Stack {
  constructor(scope: Construct, id: string, props: TodoAppProps) {
    super(scope, id, props);

    const {
      vpc,
      repository,
    } = props;

    const backend = new FargateBackend(this, "Backend", {
      vpc,
      repository,
    });

    // new StaticFrontend(this, "Frontend", {
    //   backend,
    // });
  }
}
