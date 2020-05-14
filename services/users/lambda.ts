import { ApolloServer, gql } from 'apollo-server-lambda';
import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import * as request from 'request-promise';

const typeDefs = gql`
  type User {
    id: Int
  }

  type Query {
    allUsers: [User]
  }
`;

const resolvers = {
  Query: {
    allUsers: () => request.get({ uri: 'https://jsonplaceholder.typicode.com/users', json: true }),
  },
};

const createHandler = async () => {
  const server = new ApolloServer({ schema: buildFederatedSchema([{ typeDefs, resolvers }]) });
  return server.createHandler();
};

export default (event: APIGatewayProxyEvent, context: Context, callback: Callback) => {
  createHandler().then(handler => handler(event, context, callback));
};
