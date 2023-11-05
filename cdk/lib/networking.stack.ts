// create a VPC with a public subnet an 2 availability zones
import { Construct } from "constructs";
import { Vpc, SubnetType, IpAddresses } from "aws-cdk-lib/aws-ec2";
import { Stack, StackProps } from "aws-cdk-lib";

export class Networking extends Stack {
  private readonly vpc: Vpc;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.vpc = new Vpc(this, "VPC", {
      ipAddresses: IpAddresses.cidr('10.0.0.0/16'),
      maxAzs: 2,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "Public",
          subnetType: SubnetType.PUBLIC,
        },
      ],
    });
  }

  public getVpc() {
    return this.vpc;
  }
}