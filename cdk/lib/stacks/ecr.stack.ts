// create an ecr registry for the container image
import { Stack, StackProps } from "aws-cdk-lib";
import { Repository } from "aws-cdk-lib/aws-ecr";
import { Construct } from "constructs";
import { Ecr } from "../constructs/ecr.construct";
import { config } from "../config/config";

interface IEcrStackProps extends StackProps {
}

export class EcrStack extends Stack {

  private ecr: Ecr;

  constructor(scope: Construct, id: string, props: IEcrStackProps) {
    super(scope, id, props);

    // create an ecr registry for the container image
    this.ecr = new Ecr(this, "Ecr", {
      repositoryName: config.registry.repositoryName,
    });
  }

  public getRepository(): Repository {
    return this.ecr.getRepository();
  }
}
