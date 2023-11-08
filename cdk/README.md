# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template



docker build -t todo-api ../todo-api
cdk % aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 423547597244.dkr.ecr.us-east-1.amazonaws.com
docker tag todo-api:latest 423547597244.dkr.ecr.us-east-1.amazonaws.com/todo-api:todo-api-latest
docker push 423547597244.dkr.ecr.us-east-1.amazonaws.com/todo-api:todo-api-latest