// create an ecr registry for the container image
import { Stack, StackProps } from "aws-cdk-lib";
import { Repository } from "aws-cdk-lib/aws-ecr";
import { Construct } from "constructs";

interface IEcrStackProps extends StackProps {
}

export class EcrStack extends Stack {

  private repository: Repository;

  constructor(scope: Construct, id: string, props: IEcrStackProps) {
    super(scope, id, props);

    // create an ecr registry for the container image
    this.repository = new Repository(this, "TodoApiRepository", {
      repositoryName: "todo-api",
    });
  }

  public getRepository() {
    return this.repository;
  }
}