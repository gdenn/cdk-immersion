import { Stack, StackProps } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { FargateBackend } from './fargate-backend';
import { StaticFrontend } from './static-frontend.construct';


interface TodoAppProps extends StackProps {
  vpc: Vpc
}

export class TodoApp extends Stack {
  constructor(scope: Construct, id: string, props: TodoAppProps) {
    super(scope, id, props);

    const {
      vpc
    } = props;

    const backend = new FargateBackend(this, "Backend", {
      vpc,
    });

    new StaticFrontend(this, "Frontend", {
      backend,
    });
  }
}
