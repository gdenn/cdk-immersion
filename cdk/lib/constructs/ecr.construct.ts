// creates a shared ECR repository
import { Construct } from "constructs";
import { Repository } from "aws-cdk-lib/aws-ecr";

interface IEcrProps {
  repositoryName: string;
}

export class Ecr extends Construct {

  private repository: Repository;

  constructor(scope: Construct, id: string, props: IEcrProps) {
    super(scope, id);

    const { repositoryName } = props;

    // create an ecr registry for the container image
    this.repository = new Repository(this, "EcrRepository", {
      repositoryName,
    });
  }

  public getRepository() {
    return this.repository;
  }
}