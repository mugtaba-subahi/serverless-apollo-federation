import * as request from 'request-promise';
import typeDefs from './schema';
import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';

const resolvers = {
  Query: {
    allUsers: () => request.get({ uri: 'https://jsonplaceholder.typicode.com/users', json: true }),
  },
};

const createHandler = async () => {
  const server = new ApolloServer({
    playground: { endpoint: '/dev/users' },
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  });
  return server.createHandler();
};

export const graphql = (event: APIGatewayProxyEvent, context: Context, callback: Callback) => {
  createHandler().then(handler => handler(event, context, callback));
};
