// serves the static react frontend build through a CloudFront Distribution, 
// Origin Access Identity, and S3 Bucket
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { CloudFrontWebDistribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { DockerImage, RemovalPolicy } from "aws-cdk-lib";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { FargateBackend } from "./fargate-backend";
import { Asset } from "aws-cdk-lib/aws-s3-assets";
import path = require("path");
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";


const FRONTEND_OUTPUT_PATH = path.join(__dirname, '..', '..', 'todo-ui', 'out');
console.log("frontend out path: ", FRONTEND_OUTPUT_PATH)

interface IStaticFrontendProps {
}

export class StaticFrontend extends Construct {
  private readonly bucket: Bucket;
  private readonly distribution: CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props: IStaticFrontendProps) {
    super(scope, id);

    // const backendEndpointURL = backend.getBackendEndpointURL();

    // create a bucket for the static react frontend
    this.bucket = new Bucket(this, "FrontendBucket", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // create an origin access identity for the bucket
    const originAccessIdentity = new OriginAccessIdentity(this, "OriginAccessIdentity", {
      comment: "Allows CloudFront to reach the bucket",
    });

    // grant the origin access identity read access to the bucket
    this.bucket.grantRead(originAccessIdentity);

    // create a cloudfront distribution for the bucket
    this.distribution = new CloudFrontWebDistribution(this, "FrontendDistribution", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: this.bucket,
            originAccessIdentity: originAccessIdentity,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });

    // serve the statifc build of the frontend through a cdk asset
    this.bucket.grantRead(originAccessIdentity.grantPrincipal);

    new BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [Source.asset(FRONTEND_OUTPUT_PATH)],
      destinationBucket: this.bucket,
      distribution: this.distribution,
      prune: true,
      distributionPaths: ['/index.html'],
    });
  }
}