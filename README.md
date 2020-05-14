# Serveless GraphQL using Typescript deployed to AWS Lambda

This is a simple repo making use of Apollo Federation to architect distributed GraphQL microservices on Lambdas.

## Main dependencies

1. apollo-server-lambda - used to build GraphQL server on Lambda
2. apollo/gateway - used to create a main entry point connecting the distributed GraphQL microservices into one
3. serverless - used to deploy resources to AWS Lambda through CloudFormation
4. typescript - used because... well, it's typescript!
