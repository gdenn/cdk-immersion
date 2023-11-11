// create a VPC with a public subnet an 2 availability zones
import { Construct } from "constructs";
import { Vpc, SubnetType, IIpAddresses } from "aws-cdk-lib/aws-ec2";
import { Stack, StackProps } from "aws-cdk-lib";

interface INetworkingStackProps extends StackProps {
  ipAddresses: IIpAddresses;
}

export class NetworkingStack extends Stack {
  private readonly vpc: Vpc;

  constructor(scope: Construct, id: string, props: INetworkingStackProps) {
    super(scope, id, props);

    const { ipAddresses } = props;

    this.vpc = new Vpc(this, "VPC", {
      ipAddresses,
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