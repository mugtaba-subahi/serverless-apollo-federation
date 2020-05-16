# Serveless GraphQL using Typescript deployed to AWS Lambda

This is a simple repo making use of Apollo Federation to architect distributed GraphQL microservices on Lambdas.

## Main dependencies

1. apollo-server-lambda - used to build GraphQL server on Lambda
2. apollo/gateway - used to create a main entry point connecting the distributed GraphQL microservices into one
3. serverless - used to deploy resources to AWS Lambda through CloudFormation
4. typescript - used because... well, it's typescript!

## Apollo Federation Concerns

1. graphql gateway calls X child graphql service when query from client only needs data from Z child graphql service
2. (probably answer to above) graphql gateway needs to call ALL child services to merge their schemas BEFORE letting
   it lets client make any queries at all. This is will be an issue when connecting a lot of child services.
   Especilly when only wanting to perform simple queries from 1 child service.
